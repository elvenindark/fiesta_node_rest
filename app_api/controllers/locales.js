var mongoose = require('mongoose');
var Local = mongoose.model('Local');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/*GET list of locales*/
module.exports.localesList = function (req, res) {
   Local.find(function (err, locales) {
      if(err){
        console.log('locales no encontrados')
        sendJSONresponse(res, 404, err);
      }else{
        console.log('GET /api/locales')
        sendJSONresponse(res, 200, locales);
      }
   })
}

/* GET a local by the id */
module.exports.localesReadOne = function(req, res) {
  console.log('Finding local details', req.params.localid);
  if (req.params && req.params.localid) {
    Local
      .findById(req.params.localid)
      .exec(function(err, local) {
        if (!local) {
          sendJSONresponse(res, 404, {
            "message": "localid not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(local);
        sendJSONresponse(res, 200, local);
      });
  } else {
    console.log('No localid specified');
    sendJSONresponse(res, 404, {
      "message": "No localid in request"
    });
  }
};

/* POST a new local */
/* /api/locales */
module.exports.localesCreate = function(req, res) {
  console.log(req.body);
  Local.create({
    nombre: req.body.nombre,     
    descripcion: req.body.descripcion,
    tipo: req.body.tipo,
    entrada: req.body.entrada,
    prestacion: req.body.prestacion,
    ubicacion: [{
      provincia: req.body.provincia,
      canton: req.body.canton,
      parroquia: req.body.parroquia,
      sector: req.body.sector,      
      coordenadas: [parseFloat(req.body.lng), parseFloat(req.body.lat)]      
    }],
    bebida: [{
      nombre: req.body.nombrebebida,
      precio: req.body.preciobebida,
      tipo: req.body.tipobebida
    }],
    horario: [{
      days: req.body.days,
      opening: req.body.opening,
      closing: req.body.closing,
      closed: req.body.closed,
    }]    
  }, function(err, local) {
    if (err) {
      console.log(err);
      sendJSONresponse(res, 400, err);
    } else {
      console.log(local);
      sendJSONresponse(res, 201, local);
    }
  });
};

/* PUT /api/locales/:localid */
module.exports.localesUpdateOne = function(req, res) {
  console.log(req.body);
  if (!req.params.localid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, localid is required"
    });
    return;
  }
  Local
    .findById(req.params.localid)
    .select('-ubicacion -horario -bebidas')
    .exec(
      function(err, local) {
        if (!local) {
          sendJSONresponse(res, 404, {
            "message": "localid not found"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        }
        local.nombre = req.body.nombre;
        local.descripcion = req.body.descripcion;
        local.tipo = req.body.tipo;
        local.entrada = req.body.entrada,
        local.prestacion = req.body.prestacion,
        local.ubicacion = [{
          provincia: req.body.provincia,
          canton: req.body.canton,
          parroquia: req.body.parroquia,
          sector: req.body.sector,
          coordenadas: [parseFloat(req.body.lng), parseFloat(req.body.lat)]
        }],
        local.bebidas = [{
          nombre: req.body.nombrebebida,
          precio: req.body.preciobebida,
          tipo: req.body.tipobebida
        }],
        local.horario = [{
          days: req.body.days,
          opening: req.body.opening,
          closing: req.body.closing,
          closed: req.body.closed,
        }],
        local.consortes_id = [{ 
          _id: new mongoose.mongo.ObjectId(req.body.consorteid)
        }];
        local.save(function(err, local) {
          if (err) {
            sendJSONresponse(res, 404, err);
          } else {
            sendJSONresponse(res, 200, local);
          }
        });
      }
  );
};

/* DELETE /api/locales/:localid */
module.exports.localesDeleteOne = function(req, res) {
  var localid = req.params.localid;
  if (localid) {
    Local
      .findByIdAndRemove(localid)
      .exec(
        function(err, local) {
          if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
          }
          console.log("Local id " + localid + " deleted");
          sendJSONresponse(res, 204, null);
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "No localid"
    });
  }
};

/* GET /locales/:localid/consortes*/
module.exports.localesConsortesList = function (req, res) {
  var localid = req.params.localid;
  if (localid) {
    Local
      .findById(req.params.localid)
      .populate('consortes_id','nombre origen')
      .exec(function(err, local) {
        if (!local) {
          sendJSONresponse(res, 404, {
            "message": "localid not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(local);
        sendJSONresponse(res, 200, local);
      });
  } else {
    console.log('No localid specified');
    sendJSONresponse(res, 404, {
      "message": "No localid in request"
    });
  }   
}

/*POST a new consorte /locales/:localid/consortes*/
module.exports.localesConsortesCreate = function (req, res) {
  var localid = req.params.localid;
  console.log(req.body);
  if (localid) {
    Local
      .update(
        { _id: localid }, 
        { $addToSet: {
            consortes_id: req.body.consortes_id }
        }, function (err, doc) {
            if (err) 
              return res.send(500, { error: err });
            sendJSONresponse(res, 200, doc);
        });
  } else {
    console.log('No localid specified');
    sendJSONresponse(res, 404, {
      "message": "No localid in request"
    });
  }   
}

/*DELETE an existing consorte /locales/:localid/consortes/:consorteid*/
module.exports.localesConsortesDeleteOne = function (req, res) {
   if (!req.params.localid || !req.params.consorteid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, localid and consorte_id are both required"
    });
    return;
  }else{        
    Local
     .update(
      { _id: req.params.localid },
      { $pull: {
          consortes_id: req.params.consorteid }
      },      
      function (err, doc) {
        if(err){
          console.log(consortes_id);
          return res.send(500, { error: err });
        }
        sendJSONresponse(res, 200, doc);
      });
  }
}

