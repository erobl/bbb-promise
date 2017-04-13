# bbb-promise
A library that acts as high-level bindings to the bigbluebutton REST API using request-promises to fulfill them.

Similar to my [openmeetings library](https://www.npmjs.com/package/openmeetings)

Implemented according to http://docs.bigbluebutton.org/dev/api.html

The division of each module was based on [this](http://docs.bigbluebutton.org/dev/api.html#api-resources) part of the documentation

### Install

    npm install bbb-promise

### Usage

We need to get the host and salt. You can easily get these by running

```bash
$ bbbconf --salt

       URL: some_url
      Salt: some_secret
```

After that we can create our server 

```javascript
var bbb = require('bbb-promise');
var server = bbb.server('some_url', 'some_secret');
```

With our server object we can now communicate to the bigbluebutton server to create a room:

```javascript
var extra_params = {
	record: true,
	duration: 30
}
var room = server.administration.create("Example Room", "someroomid", extra_params);
```

This creates a room called Example Room with the id someroomid and the extra parameters listed there. The library implements the required fields as parameters to each function and the non-required parameters as an extra object that may or may not be called.

The available parameters for each function call are listed [here](http://docs.bigbluebutton.org/dev/api.html)

With a room created, we can join it. 

```javascript
room.then(function(meeting) {
	var response = meeting.response;
	console.log("Use this url to enter as a moderator: " + server.administration.join("Someone Special", response.meetingID[0], response.moderatorPW[0]));

	console.log("Use this url to enter as an attendee: " + server.administration.join("Not so Special", response.meetingID[0], response.attendeePW[0]));
});
```