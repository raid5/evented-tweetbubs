require 'eventmachine'
require 'em-websocket'
require 'twitter/json_stream'
require 'json'
require 'uri'

EventMachine.run {
  @twitter = Twitter::JSONStream.connect(
    :path => URI.encode("/1/statuses/filter.json?track=ruby,ruby rails,python,django,javascript,jquery,node.js,nodejs"),
    :auth => "username:password"
  )
  
  @channel = EM::Channel.new

  @twitter.each_item do |status|
    status = JSON.parse(status)
    msg = { :username => status['user']['screen_name'], :text => status['text'] }.to_json
    @channel.push msg
  end
  
  EventMachine::WebSocket.start(:host => "0.0.0.0", :port => 8080) do |ws|
    ws.onopen {
      puts "WebSocket connection open"
      
      @sid = @channel.subscribe { |msg| ws.send msg }
    }

    ws.onmessage { |msg|
      puts "Recieved message: #{msg}"
    }

    ws.onclose {
      puts "Connection closed"
      @channel.unsubscribe(@sid)
    }
  end
 
  puts "Server started."
}