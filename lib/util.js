'use strict';

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
	var uri = host + "/api/" + action;
	var options = {
		uri: uri,
		qs: params,
	};

	return rp(options).then(function(meeting) {
		return xml2js(meeting);
	});
}

module.exports = {
	checksum: checksum,
	GETAction: GETAction,
};