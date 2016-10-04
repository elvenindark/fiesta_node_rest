var mongoose = require('mongoose');

comentarioSchema = new mongoose.Schema({
	rating: {type: Number, "default": 3},
	comentario: String,
	clientes_id: {type: mongoose.Schema.ObjectId, ref: 'Cliente'},
	locales_id: {type: mongoose.Schema.ObjectId, ref: 'Local'},
	createdOn: {type: Date, "default": Date.now}
});

mongoose.model('Comentario', comentarioSchema);