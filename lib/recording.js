'use strict';

var util = require('./util');

function recording(host, salt) {
	var rec = {
		host: host,
		salt: salt,
		getRecordings: function(kwparams) {
			kwparams = {...kwparams};

			return util.GETAction(this.host, this.salt, "getRecordings", kwparams);
		},
		publishRecordings: function(recordID, publish) {
			var qparams = {
				recordID: recordID,
				publish: publish,
			};

			return util.GETAction(this.host, this.salt, "publishRecordings", qparams);
		},
		deleteRecordings: function(recordID) {
			var qparams = {
				recordID: recordID,
			};

			return util.GETAction(this.host, this.salt, "deleteRecordings", qparams);
		},
		updateRecordings: function(recordID, kwparams) {
			kwparams = {...kwparams};

			kwparams.recordID = recordID;

			return util.GETAction(this.host, this.salt, "updateRecordings", kwparams);
		}
	};
	return rec;
}

module.exports = recording;