var mongoose = require('mongoose');
var Bebida = mongoose.model('Bebida');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/*GET list of bebidas*/
module.exports.bebidasList = function (req, res) {
   Bebida.find(function (err, bebidas) {
      if(err){
        console.log('bebidas no encontrados')
        sendJSONresponse(res, 404, err);
      }else{
        console.log('GET /api/bebidas')
        sendJSONresponse(res, 200, bebidas);
      }
   })
}

/* GET a bebida by the id */
module.exports.bebidasReadOne = function(req, res) {
  console.log('Finding bebida details', req.params.bebidaid);
  if (req.params && req.params.bebidaid) {
    Bebida
      .findById(req.params.bebidaid)
      .exec(function(err, bebida) {
        if (!bebida) {
          sendJSONresponse(res, 404, {
            "message": "bebidaid not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(bebida);
        sendJSONresponse(res, 200, bebida);
      });
  } else {
    console.log('No bebidaid specified');
    sendJSONresponse(res, 404, {
      "message": "No bebidaid in request"
    });
  }
};

/* POST a new bebida */
/* /api/bebidas */
module.exports.bebidasCreate = function(req, res) {
  console.log(req.body);
  Bebida.create({
    nombre: req.body.nombre,     
    precio: req.body.precio,
    medida: req.body.medida,
    tipo: req.body.tipo    
  }, function(err, bebida) {
    if (err) {
      console.log(err);
      sendJSONresponse(res, 400, err);
    } else {
      console.log(bebida);
      sendJSONresponse(res, 201, bebida);
    }
  });
};

/* PUT /api/bebidas/:bebidaid */
module.exports.bebidasUpdateOne = function(req, res) {
  console.log(req.body);
  if (!req.params.bebidaid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, bebidaid is required"
    });
    return;
  }
  Bebida.update(
  	{
  		_id: req.params.bebidaid
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

/* DELETE /api/bebidas/:bebidaid */
module.exports.bebidasDeleteOne = function(req, res) {
  var bebidaid = req.params.bebidaid;
  if (bebidaid) {
    Bebida
      .findByIdAndRemove(bebidaid)
      .exec(
        function(err, bebida) {
          if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
          }
          console.log("Bebida id " + bebidaid + " deleted");
          sendJSONresponse(res, 204, null);
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "No bebidaid"
    });
  }
};
