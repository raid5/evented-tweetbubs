var hoverPause = false; // set to true to enable stream pausing on hover
var tweetHovering = false;
var track = ['ruby on rails', 'ruby', 'django', 'python', 'javascript', 'jquery', 'node.js', 'nodejs'];
var numberOfTweets = 0;
var trimAt = 100;
var trimTo = 20;

// Check for console
if (!window.console) {
    window.console = {};
    window.console.log = function(){};
}

$(document).ready(function() {
  // User Interaction
  $("#tweets").hover(
    function () {
      if (hoverPause) tweetHovering = true;
    },
    function () {
      if (hoverPause) tweetHovering = false;
    }
  );
  
  // Change stream filtering
  $('#filter a').click(function(e) {
    e.stopImmediatePropagation();
    
    // Update interface selection
    var lang = detectLanguage($(this));
    $(this).toggleClass('highlight-' + lang + '-active');
    
    // Update filters
    var filter = $(this).text().toLowerCase();
    var idx = $.inArray(filter, track);
    if (idx == -1) {
      // Not in array
      track.push(filter);
    } else {
      // In array
      track.splice(idx,1);
    }
    console.log(track);
    
    return false;
  });
  
});

jQuery.fn.highlight = function(str, className) {
  var regex = new RegExp(str, "gi");

  return this.each(function () {
    this.innerHTML = this.innerHTML.replace(regex, function(matched) {
      return "<span class=\"" + className + "\">" + matched + "</span>";
    });
  });
};

jQuery.fn.highlightLanguage = function() {
  return this.highlight('ruby|ruby on rails', 'highlight-ruby')
             .highlight('python|django', 'highlight-python')
             .highlight('javascript|jquery', 'highlight-javascript')
             .highlight('node.js|nodejs', 'highlight-node')
}

function detectLanguage(ele) {
  var cs = ele.attr('class');
  if (cs.indexOf('ruby') != -1) {
    return 'ruby';
  } else if (cs.indexOf('python') != -1) {
    return 'python';
  } else if (cs.indexOf('javascript') != -1) {
    return 'javascript';
  } else if (cs.indexOf('node') != -1) {
    return 'node';
  } else {
    return 'everything';
  }
}

function isTracking(text) {
  var tracking = false;
  $.each(track, function(index, value) {
    if (text.toLowerCase().indexOf(value) != -1) {
      tracking = true;
      return false; // break out of iteration
    }
  });
  return tracking;
}