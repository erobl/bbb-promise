var util = require('./util')
,	querystring = require('querystring');

function administration(host, salt) {
	var admin = {
		host: host,
		salt: salt,
		create: function (name, id, kwparams) {
			kwparams = kwparams || {};
			kwparams.name = name;
			kwparams.meetingID = id;

			return util.GETAction(this.host, this.salt, "create", kwparams);
		},
		join: function(fullName, meetingID, password, kwparams, changeUrl) {
			kwparams = kwparams || {};
			kwparams.fullName = fullName;
			kwparams.meetingID = meetingID;
			kwparams.password = password;

			var cs = util.checksum("join", kwparams, this.salt);
			kwparams.checksum = cs;
			var qstring = querystring.stringify(kwparams);

			if(changeUrl) {
				var uri = changeUrl + "/api/join" + "?" + qstring;
				console.log(uri)
			} else {
				var uri = this.host + "/api/join" + "?" + qstring;
			}
			

			return uri;
		},
		end: function(meetingID, password) {
			var qparams = {
				meetingID: meetingID,
				password: password
			}

			return util.GETAction(this.host, this.salt, "end", qparams);
		},
		customCall: function(callName, params) {

			return util.GETAction(this.host, this.salt, callName, params);
		}
	}
	
	return admin;
}

module.exports = administration
