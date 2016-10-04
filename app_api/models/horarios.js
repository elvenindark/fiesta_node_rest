var mongoose = require('mongoose');

var horarioSchema = new mongoose.Schema({
	dias: String,
	abierto: String,
	cerrado: String,
	closed:Boolean
});

mongoose.model('Horario', horarioSchema);