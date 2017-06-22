var app = require('express')();
var http = require('http').Server(app);
var math = require('mathjs');
var io = require('socket.io')(http);
var common = require('./common/js/common.js');
var bodyParser = require('body-parser'); 
var port = 8080;


// BEGIN CONSTANTS

// Name of the monitor event for signal strength packets
const SIGNAL_STRENGTH_PACKET_RECEIVED_EVENT_NAME = "signalStrengthPacketReceived";


// WIFI Channel Frequency in MHz
// TODO: Channel hopping
const WIFI_CHANNEL_FREQUENCY = 2412; // Channel 1
const WIFI_FREE_SPACE_PATH_LOSS_CONSTANT_FOR_CHANNEL = 27.55;

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

		//if (macAddress == "f0:24:75:7b:c6:d9"){
			// Emit event details to the debug channel

			io.emit(
				common.DEBUG_CHANNEL_NAME, 
				monitorId +
				" MAC: " + macAddress +
				" Signal Strength: " + signalStrengthIndB +
				" Distance from monitor: " +
				calculateDistanceFromMonitor(
					signalStrengthIndB,
					WIFI_CHANNEL_FREQUENCY,
					WIFI_FREE_SPACE_PATH_LOSS_CONSTANT_FOR_CHANNEL
				) + " meters"
			);
		//}
	}
	res.set('Content-Type', 'text/plain');

	res.send('You sent: ' + JSON.stringify(req.body));
  
});

/**
 * Calculates distance from monitor in meters
 * 
 * @param {Number} signalLevelInDb
 * @param {Number} freqInMHz
 * @param {Number} freeSpacePathLoss
 * @return {Number} distance in meters
 */
function calculateDistanceFromMonitor(signalLevelInDb, freqInMHz, freeSpacePathLoss) {
	// TODO: Lookup free space path loss for frequency
    exp = (freeSpacePathLoss - (20 * math.log10(freqInMHz)) + math.abs(signalLevelInDb)) / 20.0;
    return Math.pow(10.0, exp);
}

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});