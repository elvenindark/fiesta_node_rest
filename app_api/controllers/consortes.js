var mongoose = require('mongoose');
var Consorte = mongoose.model('Consorte');
var Local = mongoose.model('Local');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/*GET list of consortes*/
module.exports.consortesList = function (req, res) {
   Consorte.find(function (err, consortes) {
      if(err){
        console.log('consortes no encontrados')
        sendJSONresponse(res, 404, err);
      }else{
        console.log('GET /api/consortes')
        sendJSONresponse(res, 200, consortes);
      }
   })
}

/* GET a consorte by the id */
module.exports.consortesReadOne = function(req, res) {
  console.log('Finding consorte details', req.params.consorteid);
  if (req.params && req.params.consorteid) {
    Consorte
      .findById(req.params.consorteid)
      .exec(function(err, consorte) {
        if (!consorte) {
          sendJSONresponse(res, 404, {
            "message": "consorteid not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(consorte);
        sendJSONresponse(res, 200, consorte);
      });
  } else {
    console.log('No consorteid specified');
    sendJSONresponse(res, 404, {
      "message": "No consorteid in request"
    });
  }
};

/* POST a new consorte */
/* /api/consortes */
module.exports.consortesCreate = function(req, res) {
  console.log(req.body);
  Consorte.create({
    nombre: req.body.nombre,     
    medidas: req.body.medidas,
    altura: req.body.tipo,
    origen: req.body.origen,
    tez: req.body.tez,
    telefono: req.body.telefono,
    horario: [{
      dias: req.body.dias,      
      disponible: req.body.disponible
    }]    
  }, function(err, consorte) {
    if (err) {
      console.log(err);
      sendJSONresponse(res, 400, err);
    } else {
      console.log(consorte);
      sendJSONresponse(res, 201, consorte);
    }
  });
};

/* PUT /api/consortes/:consorteid */
module.exports.consortesUpdateOne = function(req, res) {
  console.log(req.body);
  if (!req.params.consorteid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, consorteid is required"
    });
    return;
  }
  Consorte
    .findById(req.params.consorteid)
    .select('-horario')
    .exec(
      function(err, consorte) {
        if (!consorte) {
          sendJSONresponse(res, 404, {
            "message": "consorteid not found"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        }
        consorte.nombre = req.body.nombre;
        consorte.medidas = req.body.medidas;
        consorte.altura = req.body.altura;
        consorte.origen = req.body.origen;
        consorte.tez = req.body.tez;        
        consorte.telefono = req.body.telefono;
        consorte.horario = [{
          dias: req.body.dias,
          disponible: req.body.disponible
        }],
        consorte.locales_id = [{
          _id: req.body.localid
        }];
        consorte.save(function(err, consorte) {
          if (err) {
            sendJSONresponse(res, 404, err);
          } else {
            sendJSONresponse(res, 200, consorte);
          }
        });
      }
  );
};

/* DELETE /api/consortes/:consorteid */
module.exports.consortesDeleteOne = function(req, res) {
  var consorteid = req.params.consorteid;
  if (consorteid) {
    Consorte
      .findByIdAndRemove(consorteid)
      .exec(
        function(err, consorte) {
          if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
          }
          console.log("Consorte id " + consorteid + " deleted");
          sendJSONresponse(res, 204, null);
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "No consorteid"
    });
  }
};

/* GET /consortes/:consorteid/locales*/
module.exports.consortesLocalesList = function (req, res) {
  var consorteid = req.params.consorteid;
  if (consorteid) {
    Consorte
      .findById(req.params.consorteid)
      .populate('locales_id','nombre sector')
      .exec(function(err, consorte) {
        if (!consorte) {
          sendJSONresponse(res, 404, {
            "message": "consorteid not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(consorte);
        sendJSONresponse(res, 200, consorte);
      });
  } else {
    console.log('No consorteid specified');
    sendJSONresponse(res, 404, {
      "message": "No consorteid in request"
    });
  }   
}

/*POST a local /consortes/:consorteid/locales*/
module.exports.consortesLocalesCreate = function (req, res) {
   var consorteid = req.params.consorteid;
  console.log(req.body);
  if (consorteid) {
    Consorte
      .update(
        { _id: consorteid }, 
        { $addToSet: {
            locales_id: req.body.locales_id }
        }, function (err, doc) {
            if (err) 
              return res.send(500, { error: err });
            sendJSONresponse(res, 200, doc);
        });
  } else {
    console.log('No consorteid specified');
    sendJSONresponse(res, 404, {
      "message": "No consorteid in request"
    });
  }   
}


/*DELETE an existing consorte /consortes/:consorteid/locales/:localid*/
module.exports.consortesLocalesDeleteOne = function (req, res) {
   if (!req.params.consorteid || !req.params.localid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, consorteid and clocal_id are both required"
    });
    return;
  }else{        
    Consorte
     .update(
      { _id: req.params.consorteid },
      { $pull: {
          locales_id: req.params.localid }
      },      
      function (err, doc) {
        if(err){
          console.log(locales_id);
          return res.send(500, { error: err });
        }
        sendJSONresponse(res, 200, doc);
      });
  }
}
