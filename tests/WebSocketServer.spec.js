var Chemical = require("organic").Chemical;
var Plasma = require("organic").Plasma;
var WebSocketServer = require("../index");
var io = require("socket.io-client");

describe("WebSocketServer", function(){
  var plasma = new Plasma();
  var config = {
    "port": 8083,
    "socketio": {
      "close timeout": 1
    },
    "emit": {
      "ready": "WebSocketServer",
      "connection": "SocketIOConnection",
      "disconnection": "SocketIODisconnection"
    }
  }

  var server;
  var client;

  it("should create new instance", function(){
    server = new WebSocketServer(plasma, config);
    expect(server).toBeDefined();
  });

  it("should emit incoming connection", function(next){
    client = io.connect( "http://localhost", { port: config.port ,  'reconnect': false, 'force new connection': true});
    plasma.once("SocketIOConnection", function(c){
      expect(c.data).toBeDefined();
      next();
    });
  });

  it("should emit disconnection", function(next){
    plasma.once("SocketIODisconnection", function(c){
      expect(c.data).toBeDefined();
      next();
    })
    client.disconnect();
  })

  it("should close on receiving kill", function(){
    plasma.emit(new Chemical("kill"));
  });
});