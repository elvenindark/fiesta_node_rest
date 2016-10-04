var mongoose = require('mongoose');
var Comentario = mongoose.model('Comentario');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/*GET list of comentarios*/
module.exports.comentariosList = function (req, res) {
   Comentario.find(function (err, comentarios) {
      if(err){
        console.log('comentarios no encontrados')
        sendJSONresponse(res, 404, err);
      }else{
        console.log('GET /api/comentarios')
        sendJSONresponse(res, 200, comentarios);
      }
   })
}

/* GET a comentario by the id */
module.exports.comentariosReadOne = function(req, res) {
  console.log('Finding comentario details', req.params.comentarioid);
  if (req.params && req.params.comentarioid) {
    Comentario
      .findById(req.params.comentarioid)
      .exec(function(err, comentario) {
        if (!comentario) {
          sendJSONresponse(res, 404, {
            "message": "comentarioid not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(comentario);
        sendJSONresponse(res, 200, comentario);
      });
  } else {
    console.log('No comentarioid specified');
    sendJSONresponse(res, 404, {
      "message": "No comentarioid in request"
    });
  }
};

/* POST a new comentario */
/* /api/comentarios */
module.exports.comentariosCreate = function(req, res) {
  console.log(req.body);
  Comentario.create({
    dias: req.body.dias,     
    abierto: req.body.abierto,
    cerrado: req.body.cerrado,
    closed: req.body.closed    
  }, function(err, comentario) {
    if (err) {
      console.log(err);
      sendJSONresponse(res, 400, err);
    } else {
      console.log(comentario);
      sendJSONresponse(res, 201, comentario);
    }
  });
};

/* PUT /api/comentarios/:comentarioid */
module.exports.comentariosUpdateOne = function(req, res) {
  console.log(req.body);
  if (!req.params.comentarioid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, comentarioid is required"
    });
    return;
  }
  Comentario.update(
  	{
  		_id: req.params.comentarioid
  	},
  	{
  		ranking: req.body.ranking, 
  		comentario: req.body.comentario, 
  		medida: req.body.medida,   		
  	},
  	function (err, doc) {
  		if (err) 
        	return res.send(500, { error: err });
       	sendJSONresponse(res, 200, doc);
  	}
  );
};

/* DELETE /api/comentarios/:comentarioid */
module.exports.comentariosDeleteOne = function(req, res) {
  var comentarioid = req.params.comentarioid;
  if (comentarioid) {
    Comentario
      .findByIdAndRemove(comentarioid)
      .exec(
        function(err, comentario) {
          if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
          }
          console.log("Comentario id " + comentarioid + " deleted");
          sendJSONresponse(res, 204, null);
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "No comentarioid"
    });
  }
};