var mongoose = require('mongoose');
var Horario = mongoose.model('Horario');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/*GET list of horarios*/
module.exports.horariosList = function (req, res) {
   Horario.find(function (err, horarios) {
      if(err){
        console.log('horarios no encontrados')
        sendJSONresponse(res, 404, err);
      }else{
        console.log('GET /api/horarios')
        sendJSONresponse(res, 200, horarios);
      }
   })
}

/* GET a horario by the id */
module.exports.horariosReadOne = function(req, res) {
  console.log('Finding horario details', req.params.horarioid);
  if (req.params && req.params.horarioid) {
    Horario
      .findById(req.params.horarioid)
      .exec(function(err, horario) {
        if (!horario) {
          sendJSONresponse(res, 404, {
            "message": "horarioid not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(horario);
        sendJSONresponse(res, 200, horario);
      });
  } else {
    console.log('No horarioid specified');
    sendJSONresponse(res, 404, {
      "message": "No horarioid in request"
    });
  }
};

/* POST a new horario */
/* /api/horarios */
module.exports.horariosCreate = function(req, res) {
  console.log(req.body);
  Horario.create({
    dias: req.body.dias,     
    abierto: req.body.abierto,
    cerrado: req.body.cerrado,
    closed: req.body.closed    
  }, function(err, horario) {
    if (err) {
      console.log(err);
      sendJSONresponse(res, 400, err);
    } else {
      console.log(horario);
      sendJSONresponse(res, 201, horario);
    }
  });
};

/* PUT /api/horarios/:horarioid */
module.exports.horariosUpdateOne = function(req, res) {
  console.log(req.body);
  if (!req.params.horarioid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, horarioid is required"
    });
    return;
  }
  Horario.update(
  	{
  		_id: req.params.horarioid
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

/* DELETE /api/horarios/:horarioid */
module.exports.horariosDeleteOne = function(req, res) {
  var horarioid = req.params.horarioid;
  if (horarioid) {
    Horario      .findByIdAndRemove(horarioid)
      .exec(
        function(err, local) {
          if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
          }
          console.log("horarioid " + horarioid + " deleted");
          sendJSONresponse(res, 204, null);
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "No horarioid"
    });
  }
};