$(document).ready(function() {
  
  // Setup Socket.IO
  var socket = new io.Socket('localhost', { port: 8080 });
  socket.connect();
  
  socket.on('connect', function() {
    console.log("Socket.IO opened.");
  });
  
  socket.on('message', function(data) {
    if (!tweetHovering) {
      // Append only when not hovering over tweets

      if (!isTracking(data.text)) {
        console.log('Skipped: ' + data.text);
        return; // skip non-tracked tweets
      }
      
      var msg = "@" + data.username + ": " + data.text;
      
      $('<p style="display:none;">' + msg + '</p>')
        .prependTo('#tweets')
        .highlightLanguage()
        .slideDown();
      
      numberOfTweets += 1;
      if (numberOfTweets >= trimAt) {
        // Trim the dom
        console.log('Limit of ' + trimAt + ' reached, trimming tweets to ' + trimTo);
        $('#tweets p:gt(' + (trimTo+1) + ')').remove();
        numberOfTweets = trimTo;
      }
    }
  });
  
  socket.on('disconnect', function() {
    console.log("Socket.io closed.");
  });
  
});