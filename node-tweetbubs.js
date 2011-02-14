var http = require('http'),
     url = require('url'),
      fs = require('fs'),
     sys = require('sys'),
      io = require('socket.io'),
 tstream = require('evented-twitter').TwitterStream,

server = http.createServer(function(req, res) {
 var path = url.parse(req.url).pathname;
 switch (path){
   case '/tweetbubs.css':
   case '/socket.io.js':
   case '/tweetbubs.js':
   case '/socket.io-client.js':
   case '/tweetbubs.html':
     fs.readFile(__dirname + path, function(err, data){
       if (err) return send404(res);
       
       var contentType = 'text/html';
       if (path.indexOf('.js') != -1) {
         contentType = 'text/javascript';
       } else if (path.indexOf('.css') != -1) {
         contentType = 'text/css';
       }
       
       res.writeHead(200, {'Content-Type': contentType})
       res.write(data, 'utf8');
       res.end();
     });
     break;
     
   default: send404(res);
 }
}),

send404 = function(res){
  res.writeHead(404);
  res.write('404');
  res.end();
};

server.listen(8080);
sys.puts('Server started.');
  
// socket.io 
var socket = io.listen(server); 
socket.on('connection', function(client) {
  client.on('message', function() {});
  client.on('disconnect', function() {});
});

// twitter (evented-twitter)
var t = new tstream('username', 'password');
var stream = t.filter('json', {'track': 'ruby,ruby rails,python,django,javascript,jquery,node.js,nodejs'});

stream.addListener('ready', function() {
  stream.addListener('tweet', function(tweet) {
    if(!String(tweet).trim()) return;
    try {
      var t = JSON.parse(tweet);
      socket.broadcast({ username: t.user.screen_name, text: t.text });
    } catch(e) {
      sys.debug('\nProblem parsing: ' + tweet);
      sys.debug(e.message);
      sys.debug(e.stack);
    }
  });

  stream.addListener('complete', function(response) {
    stream.close();
  });
});

stream.addListener('error', function(err) {
  sys.debug(err.message);
  throw err;
});

stream.start();
