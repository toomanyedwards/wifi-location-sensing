var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var common = require('./common/js/common.js');
var bodyParser = require('body-parser'); 
var port = 8080;


// BEGIN CONSTANTS

const SIGNAL_STRENGTH_PACKET_RECEIVED_EVENT_NAME = "signalStrengthPacketReceived";

// END CONSTANTS


// Parse POST requests as json
app.use(bodyParser.json());

// GET request handlers
app.get('/static/*', function (req, res) {
	res.sendFile(__dirname + req.url);
});


app.get('/common/*', function (req, res) {
	res.sendFile(__dirname + req.url);
});

app.get('/', function (req, res) {
	res.sendFile( __dirname + '/static/app.html');
});


app.get('/debug', function (req, res) {
	res.sendFile( __dirname + '/static/debug.html');
});

// POST request handler
app.post('/', function(req, res){

	// Extract the event
  	const event = req.body.event;

	// Verify event type supported
	if(event === undefined || !(event.name == SIGNAL_STRENGTH_PACKET_RECEIVED_EVENT_NAME)) {
		io.emit(common.DEBUG_CHANNEL_NAME, "Unsupported POST request: " + JSON.stringify(req.body) );
	}
	else{

		var monitorId = event.monitorId;
		var macAddress = event.macAddress;
		var signalStrengthIndB = event.signalStrengthIndB

		// Emit event details to the debug channel

		io.emit(
			common.DEBUG_CHANNEL_NAME, 
			"Received event: " + event.name + 
			" Source: " + event.monitorId +
			" Device MAC: " + event.macAddress +
			" Signal Strength: " + event.signalStrengthIndB
			);
	}
	res.set('Content-Type', 'text/plain');

	res.send('You sent: ' + JSON.stringify(req.body));
  
});


io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});