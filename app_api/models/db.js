var mongoose = require('mongoose');
var readline = require('readline');
var dbURI = 'mongodb://localhost/fiestapp';
if(process.env.NODE_ENV === 'production'){
	//dbURI = 'mongodb://loc8r:iskb666@ds161295.mlab.com:61295/dev-loc8r'
	dbURI = process.env.MONGOLAB_URI;
}
mongoose.connect(dbURI);
//revisar que evento se realiza en mongo
mongoose.connection.on('connected', function () {
console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error',function (err) {
console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
console.log('Mongoose disconnected');
});

if(process.platform === 'win32'){
	var rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	rl.on("SIGINT", function () {
		 process.emit("SIGINT");
	})
}

var gracefulShutdown = function (msg, callback) {
	 mongoose.connection.close(function () {
	 	 console.log('Mongoose disconnected through ' + msg);
	 	 callback();
	 })
}

process.once('SIGUSR2', function () {
	gracefulShutdown('nodemon restart', function () {
		process.kill(process.pid, 'SIGUSR2');
	});
});
process.on('SIGINT', function () {
	gracefulShutdown('app termination', function () {
		process.exit(0);
	});
});
process.on('SIGTERM', function() {
	gracefulShutdown('Heroku app shutdown', function () {
		process.exit(0);
	});
});

require('./locales');
require('./consortes');
require('./clientes');
require('./comentarios');
require('./bebidas');
require('./horarios');
require('./ubicaciones');