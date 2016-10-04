var mongoose = require('mongoose');
var Evento = mongoose.model('Evento');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/*GET list of eventos*/
module.exports.eventosList = function (req, res) {
   Evento.find(function (err, eventos) {
      if(err){
        console.log('eventos no encontrados')
        sendJSONresponse(res, 404, err);
      }else{
        console.log('GET /api/eventos')
        sendJSONresponse(res, 200, eventos);
      }
   })
}

/* GET a evento by the id */
module.exports.eventosReadOne = function(req, res) {
  console.log('Finding evento details', req.params);
  if (req.params && req.params.eventoid) {
    Evento
      .findById(req.params.eventoid)
      .exec(function(err, evento) {
        if (!evento) {
          sendJSONresponse(res, 404, {
            "message": "eventoid not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(evento);
        sendJSONresponse(res, 200, evento);
      });
  } else {
    console.log('No eventoid specified');
    sendJSONresponse(res, 404, {
      "message": "No eventoid in request"
    });
  }
};

/* POST a new evento */
/* /api/locations */
module.exports.eventosCreate = function(req, res) {
  console.log(req.body);
  Evento.create({
    fecha: req.body.fecha,    
    eventoGenerador: [{
      enum: ['req.body.eventoGenerador']
      }        
    ],
    descripcion: req.body.descripcion,
    efectosSecundarios: req.body.efectosSecundarios,
    amenazas: req.body.amenazas    
  }, function(err, evento) {
    if (err) {
      console.log(err);
      sendJSONresponse(res, 400, err);
    } else {
      console.log(location);
      sendJSONresponse(res, 201, evento);
    }
  });
};

