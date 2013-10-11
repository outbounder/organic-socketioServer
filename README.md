# organic-socketioserver

The organelle wraps [socketio](http://socket.io/) server v0.9.x

## DNA structure and defaults

    {
      "attachToChemical": String,
      "port": Number,
      "socketio": Object, /* optional */
      "emit": {
        "ready": String,
        "connection": String,
        "disconnection": String /* optional */
      }
    }

- `attachToChemical` is optional and indicates to start the socketio server
once the organelle catches given `attachToChemical` chemical type.

- `port` is used instead if `attachToChemical` is not provided
to boot up standalone socketio server with buildin httpServer instance

## Emits chemicals when

### ready for incoming connections

Emitted with Chemical type value of `dna.emit.ready`.
Chemical's structure:

    {
      "type": `dna.emit.ready`,
      "data": SocketIOServer
    }

### incoming client connnection

Emitted with Chemical type value of `dna.emit.connection`.
Chemical's structure:

    {
      "type": `dna.emit.connection`,
      "socket": SocketIOConnection
    }

### disconnected client

Emitted with Chemical type value of `dna.emit.disconnection` only if present.
Chemical's structure:

    {
      "type": `dna.emit.disconnection`,
      "socket": SocketIOConnection
    }

## Reacts to chemicals

### type: "kill"

Closes underlaying socketioServer instance

### type: `attachToChemical` value

Expected Chemical structure:

    {
      "data": HttpServer
    }

- [HttpServer](http://nodejs.org/api/http.html#http_class_http_server)
- the chemical is not aggregated
