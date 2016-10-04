var mongoose = require('mongoose');
//var localSchema = require('./locales');

var horarioSchema = new mongoose.Schema({
	dias: String,	
	disponible:Boolean
});

var consorteSchema = new mongoose.Schema({	
	nombre: String,
	medidas: String,
	altura: String,	
	origen: String,	
	tez: String,	
	telefono: String,
	horarios_id: [{type : mongoose.Schema.ObjectId, ref: 'Horario'}],
	locales_id: [{type : mongoose.Schema.ObjectId, ref: 'Local'}],
	createdOn: {type: Date, "default": Date.now}
});

//consorteSchema.index({'locales_id':1});

mongoose.model('Consorte', consorteSchema);