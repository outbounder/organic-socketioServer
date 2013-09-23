# outgoing | WebSocketServer

Emitted once the socketserver is ready for accepting incoming connections.

* data - WebSocketServer instance


# incoming | HttpServer

this is optional, and depends on the `attachToChemical` DNA configuration

* data.server - ExpressHttpServer instance


# organel | WebSocketServer 

One of the following should be provided to boot up WebSocketServer.
It is using socket.io under-the-hood as transports provider.

* `attachToChemical` - String
  
  when provided the Organelle will start listening to any chemicals with given type as String.

* `port` - Number

  when provided the Organelle will start own http server on given port and wire-up websockets server to it (functionality provided by socket.io)

* `addons` - [ AddonObject ]

  #### Addon Object 
  
  * `String` - full path to Addon source code or

            {
             source: full path to Addon source code
             ... `config` of Addon
            }

    #### addon source code example

        module.exports = function(`websocketServer`, `config`){
         var io = websocketServer.server; // socket.io
        }