var mongoose = require('mongoose');
var Ubicacion = mongoose.model('Ubicacion');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/*GET list of ubicaciones*/
module.exports.ubicacionesList = function (req, res) {
   Ubicacion.find(function (err, ubicaciones) {
      if(err){
        console.log('ubicaciones no encontrados')
        sendJSONresponse(res, 404, err);
      }else{
        console.log('GET /api/ubicaciones')
        sendJSONresponse(res, 200, ubicaciones);
      }
   })
}

/* GET a ubicacion by the id */
module.exports.ubicacionesReadOne = function(req, res) {
  console.log('Finding ubicacion details', req.params.ubicacionid);
  if (req.params && req.params.ubicacionid) {
    Ubicacion
      .findById(req.params.ubicacionid)
      .exec(function(err, ubicacion) {
        if (!ubicacion) {
          sendJSONresponse(res, 404, {
            "message": "ubicacionid not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(ubicacion);
        sendJSONresponse(res, 200, ubicacion);
      });
  } else {
    console.log('No ubicacionid specified');
    sendJSONresponse(res, 404, {
      "message": "No ubicacionid in request"
    });
  }
};

/* POST a new ubicacion */
/* /api/ubicaciones */
module.exports.ubicacionesCreate = function(req, res) {
  console.log(req.body);
  Ubicacion.create({
    nombre: req.body.nombre,     
    precio: req.body.precio,
    medida: req.body.medida,
    tipo: req.body.tipo    
  }, function(err, ubicacion) {
    if (err) {
      console.log(err);
      sendJSONresponse(res, 400, err);
    } else {
      console.log(ubicacion);
      sendJSONresponse(res, 201, ubicacion);
    }
  });
};

/* PUT /api/ubicaciones/:ubicacionid */
module.exports.ubicacionesUpdateOne = function(req, res) {
  console.log(req.body);
  if (!req.params.ubicacionid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, ubicacionid is required"
    });
    return;
  }
  Ubicacion.update(
  	{
  		_id: req.params.ubicacionid
  	},
  	{
  		nombre: req.body.nombre, 
  		precio: req.body.precio, 
  		medida: req.body.medida, 
  		tipo: req.body.tipo
  	},
  	function (err, doc) {
  		if (err) 
        	return res.send(500, { error: err });
       	sendJSONresponse(res, 200, doc);
  	}
  );
};

/* DELETE /api/ubicaciones/:ubicacionid */
module.exports.ubicacionesDeleteOne = function(req, res) {
  var ubicacionid = req.params.ubicacionid;
  if (ubicacionid) {
    Ubicacion
      .findByIdAndRemove(ubicacionid)
      .exec(
        function(err, ubicacion) {
          if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
          }
          console.log("Ubicacion id " + ubicacionid + " deleted");
          sendJSONresponse(res, 204, null);
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "No ubicacionid"
    });
  }
};
