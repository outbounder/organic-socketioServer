# outgoing | WebSocketServer

Emitted once the socketserver is ready for accepting incoming connections.

* data - WebSocketServer instance


# incoming | HttpServer

this is optional, and depends on the `attachToChemical` DNA configuration

* data - HttpServer instance


# organel | WebSocketServer 

One of the following should be provided to boot up WebSocketServer.
It is using socket.io under-the-hood as transports provider.

* `attachToChemical` - String
  
  when provided the Organelle will start listening to any chemicals with given type as String.

* `port` - Number

  when provided the Organelle will start own http server on given port and wire-up websockets server to it (functionality provided by socket.io)

* emit
  * ready - String, name of chemical to emit when ready
  * connection - String, name of chemical to emit when new connection arrives
  * disconnection - String, name of chemical to emit when client disconnects