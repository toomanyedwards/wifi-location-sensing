var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var common = require('./common/common.js');
var bodyParser = require('body-parser'); 
var port = 8080;


//support parsing of application/json type post data
//app.use(bodyParser.text({type: '*/*'}));
//bodyParser.json();
/*
app.use(bodyParser.urlencoded({
    extended: true
}));
*/

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */


// JUST NEED THIS FOR JSON
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
//app.use(bodyParser.urlencoded({ extended: true }));

app.get('/static/*', function (req, res) {
	res.sendFile(__dirname + req.url);
});

app.get('/', function (req, res) {
	res.sendFile( __dirname + '/static/app.html');
	io.emit(common.DEBUG_CHANNEL_NAME, 'FOO');
});


app.get('/debug', function (req, res) {
	res.sendFile( __dirname + '/static/debug.html');
});

/*
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

*/
app.post('/', function(req, res){
  const body = req.body;
  //io.emit(common.DEBUG_CHANNEL_NAME, 'Received post: foo2 ' + body);
  io.emit(common.DEBUG_CHANNEL_NAME, 'Received post: bar ' + body.event.name);
  res.set('Content-Type', 'text/plain');
  //res.send('You sent foo2: ' + body + ' to Express');
  res.send('You sent foo2: ' + JSON.stringify(body) + ' to Express');
  //io.emit('chat message', 'Received post: ' + body);
  
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});