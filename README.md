Evented Twitter Streaming API Experiment
========================================

To better familiarize myself with evented code, I wrote up this simple project that makes use of the Twitter Streaming API, Node.js (or EventMachine) and Websockets.

For the server, you can either run Node.js or Ruby EventMachine. The Node.js setup makes use of [Socket.IO-node](https://github.com/LearnBoost/Socket.IO-node) and [Socket.IO](https://github.com/LearnBoost/Socket.IO) to add support for browsers that don't support the Websockets protocol (such as Firefox 3.x). The EventMachine setup only works with browsers that support Websockets. You can check if your browser supports Websockets at [http://websocket.org](http://websocket.org/echo.html).

Demo
----

You can checkout the [demo](http://50.18.54.241:8080/client/tweetbubs.html) I have currently running on Amazon EC2.

Running via Node.js
-------------------

* Clone/fork this project
* Install [Node.js](https://github.com/ry/node)
* Install [npm](https://github.com/isaacs/npm) (optional but recommended)
* Install [Socket.IO-node](https://github.com/LearnBoost/Socket.IO-node)

        npm install socket.io

* Install [evented-twitter](https://github.com/polotek/evented-twitter)

        npm install evented-twitter

* Modify node-tweetbubs.js to include your Twitter username/password

        var t = new tstream('username', 'password');

* Start the Node.js server

        node node-tweetbubs.js
        
* Open tweetbubs.html in your browser. By default, this html file is set to communicate with Node.js through Socket.IO.

Running via EventMachine
------------------------

* Clone/fork this project
* Install [Bundler](http://gembundler.com/) and run

        bundle
        
* OR install each gem in Gemfile individually
* Modify em-tweetbubs.rb to include your Twitter username/password

        :auth => "username:password"

* Start the EventMachine server
  
        ruby em-tweetbubs.rb

* Modify tweetbubs.html to use Websockets only (not Socket.IO). To accomplish this, remove

        <script type="text/javascript" charset="utf-8" src="socket.io.js"></script>

    then replace the following:

        <script type="text/javascript" charset="utf-8" src="socket.io-client.js"></script>

    with:

        <script type="text/javascript" charset="utf-8" src="websocket.js"></script>

* Open tweetbubs.html in your browser
