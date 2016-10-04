var mongoose = require('mongoose');

var accesibilidadSchema = new mongoose.Schema({
	viaTerrestre: {type: Boolean, default: false},
	viaAerea: {type: Boolean, default: false},
	viaFluvial: {type: Boolean, default: false},
	tipoTransporte: {type: String, required: true},
	createdOn: {type: Date, default: Date.now}
});

var viviendaSchema = new mongoose.Schema({
	habitable: {type: Number, default: 0, min: 0, max: 100000},
	temporaNoHabitable: {type: Number, default: 0, min: 0, max: 100000},
	danoParcialHabitable: {type: Number, default: 0, min: 0, max: 100000},
	danoTotalNoHabitable: {type: Number, default: 0, min: 0, max: 100000},
	totalHabitable: {type: Number, default: 0, min: 0, max: 100000},
	observaciones: String,
	createdOn: {type: Date, default: Date.now}
});

var servicioSchema = new mongoose.Schema({
	tipoServicios:{
		type: String,
		required: true,
		enum:['REDES DE AGUA','ENERGIA ELECTRICA','LETRINAS','HOSPITALES CENTRO SALUD','TELEFONIA FIJA','TELEFONIA CELULAR','CENTROS EDUCATIVOS','ALBERGUES','VIAS ACCESO']
	},
	funcionamiento:{
		type: Boolean,
		default: true,
		required: true
	},
	tipoDano:{
		type: String,
		enum:['SIN DANO','DANO PARCIAL','DANO TOTAL']
	},
	aplica: Boolean,
	observaciones: String,
	createdOn: {type: Date, default: Date.now}
});

var poblacionSchema = new mongoose.Schema({
	tipoAfectacion: {
		type: String, 
		required: true,
		enum: ['AFECTADOS','DAMNIFICADOS','EVACUADOS','ALBERGADOS','HERIDOS','DESAPARECIDOS','FALLECIDOS']
	},
	hombres: {type: Number, default: 0, min: 0, max: 100000},
	mujeres: {type: Number, default: 0, min: 0, max: 100000},
	ninos: {type: Number, default: 0, min: 0, max: 100000},
	ninas: {type: Number, default: 0, min: 0, max: 100000},
	familias: {type: String, required: true},	
	createdOn: {type: Date, default: Date.now}
});

var ubicacionSchema = new mongoose.Schema({
	provincia: String,
	canton: String,
	parroquia: String,
	sector: String,
	tipoParroquia:{
		type: String,
		enum:['URBANA','RURAL'],
		required: true
	},
	coordenadas: {type: [Number], index: '2dsphere'},
	createdOn: {type: Date, default: Date.now}
});

var eventoSchema = new mongoose.Schema({
	fecha: {type: Date, required: true, default: Date.now()},
	eventoGenerador:{
		type: String,
		enum: ['SISMO','TSUNAMI','ERUPCION VOLCANICA','INCENDIO FORESTAL','INCENDIO ESTRUCTURAL','DESLAVE','INUNDACION','SEQUIA'],
		required: true		
	},
	descripcion: String,
	efectosSecundarios: String,
	amenazas: String,
	ubicacion: [ubicacionSchema],
	poblaciones: [poblacionSchema],
	servicios: [servicioSchema],
	vivienda: [viviendaSchema],
	accesibilidad: [accesibilidadSchema],
	createdOn: {type: Date, "default": Date.now}
});

mongoose.model('Evento', eventoSchema);