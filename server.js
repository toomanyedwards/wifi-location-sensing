var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser'); 
var port = 8080;


//support parsing of application/json type post data
app.use(bodyParser.text({type: '*/*'}));

//support parsing of application/x-www-form-urlencoded post data
//app.use(bodyParser.urlencoded({ extended: true }));

app.get('/static/*', function (req, res) {
	res.sendFile(__dirname + req.url);
});
app.get('/*', function (req, res) {
	res.sendFile( __dirname + '/static/app.html');
});


/*
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

*/
app.post('/', function(req, res){
  const body = req.body;
  io.emit('chat message', 'Received post: ' + body);
  res.set('Content-Type', 'text/plain');
  res.send('You sent foo2: ' + body + ' to Express');
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