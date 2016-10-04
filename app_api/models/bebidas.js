var mongoose = require('mongoose');

bebidaSchema = new mongoose.Schema({
	nombre: String,
	precio: Number,
	medida: String,
	tipo: String,
	createdOn: {type: Date, "default": Date.now}
});

mongoose.model('Bebida', bebidaSchema);