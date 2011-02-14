$(document).ready(function() {
  
  // Setup WebSocket
  var socket = new WebSocket("ws://localhost:8080");
  
  socket.onopen = function(evt) {
    console.log("WebSocket opened.");
  };
  
  socket.onmessage = function(evt) {
    if (!tweetHovering) {
      // Append only when not hovering over tweets
      var data = JSON.parse(evt.data);
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
  };
  
  socket.onclose = function(evt) {
    console.log("WebSocket closed.");
  };
  
});