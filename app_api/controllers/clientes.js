var mongoose = require('mongoose');
var Cliente = mongoose.model('Cliente');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/*GET list of clientes*/
module.exports.clientesList = function (req, res) {
   Cliente.find(function (err, clientes) {
      if(err){
        console.log('clientes no encontrados')
        sendJSONresponse(res, 404, err);
      }else{
        console.log('GET /api/clientes')
        sendJSONresponse(res, 200, clientes);
      }
   })
}

/* GET a cliente by the id */
module.exports.clientesReadOne = function(req, res) {
  console.log('Finding cliente details', req.params.clienteid);
  if (req.params && req.params.clienteid) {
    Cliente
      .findById(req.params.clienteid)
      .exec(function(err, cliente) {
        if (!cliente) {
          sendJSONresponse(res, 404, {
            "message": "clienteid not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(cliente);
        sendJSONresponse(res, 200, cliente);
      });
  } else {
    console.log('No clienteid specified');
    sendJSONresponse(res, 404, {
      "message": "No clienteid in request"
    });
  }
};

/* POST a new cliente */
/* /api/clientes */
module.exports.clientesCreate = function(req, res) {
  console.log(req.body);
  Cliente.create({
    dias: req.body.dias,     
    abierto: req.body.abierto,
    cerrado: req.body.cerrado,
    closed: req.body.closed    
  }, function(err, cliente) {
    if (err) {
      console.log(err);
      sendJSONresponse(res, 400, err);
    } else {
      console.log(cliente);
      sendJSONresponse(res, 201, cliente);
    }
  });
};

/* PUT /api/clientes/:clienteid */
module.exports.clientesUpdateOne = function(req, res) {
  console.log(req.body);
  if (!req.params.clienteid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, clienteid is required"
    });
    return;
  }
  Cliente.update(
  	{
  		_id: req.params.clienteid
  	},
  	{
  		nick: req.body.nick, 
  		correo: req.body.correo, 
  		password: req.body.password, 
  		rango: req.body.rango
  	},
  	function (err, doc) {
  		if (err) 
        	return res.send(500, { error: err });
       	sendJSONresponse(res, 200, doc);
  	}
  );
};

/* DELETE /api/clientes/:clienteid */
module.exports.clientesDeleteOne = function(req, res) {
  var clienteid = req.params.clienteid;
  if (clienteid) {
    Cliente      
    .findByIdAndRemove(clienteid)
      .exec(
        function(err, cliente) {
          if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
          }
          console.log("clienteid " + clienteid + " deleted");
          sendJSONresponse(res, 204, null);
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "No clienteid"
    });
  }
};

/* GET /clientes/:clienteid/comentarios*/
module.exports.clientesComentariosList = function (req, res) {
  var clienteid = req.params.clienteid;
  if (clienteid) {
    Cliente
      .findById(req.params.clienteid)
      .populate('comentarios_id','ranking comentario')
      .exec(function(err, cliente) {
        if (!cliente) {
          sendJSONresponse(res, 404, {
            "message": "clienteid not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(cliente);
        sendJSONresponse(res, 200, cliente);
      });
  } else {
    console.log('No clienteid specified');
    sendJSONresponse(res, 404, {
      "message": "No clienteid in request"
    });
  }   
}

/*POST a comentario /clientes/:clienteid/comentarios*/
module.exports.clientesComentariosCreate = function (req, res) {
   var clienteid = req.params.clienteid;
  console.log(req.body);
  if (clienteid) {
    Cliente
      .update(
        { _id: clienteid }, 
        { $addToSet: {
            comentarios_id: req.body.comentarios_id }
        }, function (err, doc) {
            if (err) 
              return res.send(500, { error: err });
            sendJSONresponse(res, 200, doc);
        });
  } else {
    console.log('No clienteid specified');
    sendJSONresponse(res, 404, {
      "message": "No clienteid in request"
    });
  }   
}

/*DELETE an existing cliente /clientes/:clienteid/comentarios/:comentarioid*/
module.exports.clientesComentariosDeleteOne = function (req, res) {
   if (!req.params.clienteid || !req.params.comentarioid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, clienteid and ccomentario_id are both required"
    });
    return;
  }else{        
    Cliente
     .update(
      { _id: req.params.clienteid },
      { $pull: {
          comentarios_id: req.params.comentarioid }
      },      
      function (err, doc) {
        if(err){
          console.log(comentarios_id);
          return res.send(500, { error: err });
        }
        sendJSONresponse(res, 200, doc);
      });
  }
}
