var util = require("util");
var Organel = require("organic").Organel;
var Chemical = require("organic").Chemical;

var io = require('socket.io');

module.exports = Organel.extend(function SocketioServer(plasma, config){
  Organel.call(this, plasma);

  var self = this;
  this.config = config;

  if(config.attachToChemical)
    this.on(config.attachToChemical, this.listen);
  else
  if(config.port)
    this.listen({data: config.port})
  else
    throw new Error("Can't find attachToChemical or port in config", config);
     
  this.on("kill", this.dispose);
}, {
  dispose: function() {
    if(this.server && !this.config.attachToChemical)
      this.server.server.close();
    return false;
  },
  listen: function(chemical){
    var self = this
    this.server = io.listen(chemical.data, this.config.socketio || {}, function(){
      self.emit(new Chemical(self.config.emit.ready, self.server));  
    });
    if(typeof chemical.data != "number")
      self.emit(new Chemical(self.config.emit.ready, self.server));  
    this.server.set("log level", this.config.logLevel || 0);
    this.server.sockets.on('connection', function(socket){ self.handleIncomingConnection(socket); });
    return false;
  },
  handleIncomingConnection: function(connection){
    var self = this;
    connection.on('disconnect', function(){
      self.emit(new Chemical(self.config.emit.disconnection, connection)); 
    });
    this.emit(new Chemical(self.config.emit.connection, connection));
  }
})