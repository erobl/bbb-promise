var util = require('./util');

function monitoring(host, salt) {
	var mon = {
		host: host,
		salt: salt,
		getMeetingInfo: function(meetingID) {
			qparams = {
				meetingID: meetingID
			}

			return util.GETAction(this.host, this.salt, "getMeetingInfo", qparams);
		},
		isMeetingRunning: function(meetingID) {
			qparams = {
				meetingID: meetingID
			}

			return util.GETAction(this.host, this.salt, "isMeetingRunning", qparams);
		},
		getMeetings: function() {
			qparams = {};

			return util.GETAction(this.host, this.salt, "getMeetings", qparams);
		}
	}

	return mon
}

module.exports = monitoring