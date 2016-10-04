var mongoose = require('mongoose');

var ubicacionSchema = new mongoose.Schema({
	provincia: String,
	canton: String,
	parroquia: String,
	sector: String,	
	coordenadas: {type: [Number], index: '2dsphere'},
	createdOn: {type: Date, default: Date.now}
});

mongoose.model('Ubicacion', ubicacionSchema);