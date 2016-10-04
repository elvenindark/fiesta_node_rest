var mongoose = require('mongoose');

var localSchema = new mongoose.Schema({	
	nombre: String,
	descripcion: String,
	direccion: String,
	tipo: String,	
	entrada: Number,
	prestacion: Number,
	rating: Number,
	ubicaciones_id: {type: mongoose.Schema.ObjectId, ref: 'Ubicacion'},	
	horarios_id: [{type: mongoose.Schema.ObjectId, ref: 'Horario'}],
	bebidas_id:[{type: mongoose.Schema.ObjectId, ref: 'Bebida'}],
	consortes_id: [{type: mongoose.Schema.ObjectId, ref: 'Consorte'}],	
	comentarios_id: [{type: mongoose.Schema.ObjectId, ref: 'Comentario'}],
	createdOn: {type: Date, "default": Date.now}
});

//localSchema.index({'consortes_id':1});

mongoose.model('Local', localSchema);