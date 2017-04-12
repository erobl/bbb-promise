var sha1 = require('sha1')
, 	querystring = require('querystring')
,	buildUrl = require('build-url')
,	xml2js = require('xml2js-es6-promise')
,	rp = require('request-promise');

function checksum(callName, qparams, salt) {
	var qstring = querystring.stringify(qparams);
	return sha1(callName + qstring + salt);
}

function GETAction(host, salt, action, params) {
	var cs = checksum(action, params, salt);

	params.checksum = cs;
	var uri = host + "/api/" + action
	var options = {
		uri: uri,
		qs: params
	}

	return rp(options).then(function(meeting) {
		return xml2js(meeting)
	});
}

function createServer(host, salt) {
	var server = {
		host: host,
		salt: salt,
		create: function (name, id, kwparams) {
			kwparams = kwparams || {};
			kwparams.name = name;
			kwparams.meetingID = id;

			return GETAction(this.host, this.salt, "create", kwparams);
		},
		getMeetingInfo: function(meetingID) {
			qparams = {
				meetingID: meetingID
			}

			return GETAction(this.host, this.salt, "getMeetingInfo", qparams);
		},
		join: function(fullName, meetingID, password, kwparams) {
			kwparams = kwparams || {};
			kwparams.fullName = fullName;
			kwparams.meetingID = meetingID;
			kwparams.password = password;

			var cs = checksum("join", kwparams, this.salt);
			kwparams.checksum = cs;
			var qstring = querystring.stringify(kwparams);
			var uri = this.host + "/api/join" + "?" + qstring;

			return uri;
		},
		isMeetingRunning: function(meetingID) {
			qparams = {
				meetingID: meetingID
			}

			return GETAction(this.host, this.salt, "isMeetingRunning", qparams);
		}
	}

	return server;
}

module.exports = {
	server: createServer
}