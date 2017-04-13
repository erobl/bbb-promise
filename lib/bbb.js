var admin = require('./administration')
,	monitor = require('./monitoring')
,	rec = require('./recording');

function createServer(host, salt) {
	var administration = admin(host, salt);
	var monitoring = monitor(host, salt);
	var recording = rec(host, salt);

	var server = {
		administration: administration,
		monitoring: monitoring,
		recording: recording
	}

	return server;
}

module.exports = {
	server: createServer
}