var mongoose = require('mongoose');

var clienteSchema = new mongoose.Schema({	
	nick: String,
	correo: String,
	password: String, 
	rango: String,
	comentarios_id: [{type : mongoose.Schema.ObjectId, ref: 'Comentario'}],
	createdOn: {type: Date, "default": Date.now}
});

mongoose.model('Cliente', clienteSchema);