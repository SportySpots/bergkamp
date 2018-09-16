const WebSocketServer = require('websocket').server;
const http = require('http');

const singleton = {
  httpServer: null,
  wsServer: null,
  connection: null,
};

const startServer = () => new Promise((resolve, reject) => {
  let httpServer = singleton.httpServer = http.createServer(function (request, response) {
    // process HTTP request. Since we're writing just WebSockets
    // server we don't have to implement anything.
  });

  /* port 8020 is hardwired into the cruijff testing image
   * as well as server address 10.0.2.2 */
  httpServer.listen(8020, function () {
    // resolve();
  });

  // create the server
  let wsServer = singleton.wsServer = new WebSocketServer({
    httpServer: singleton.httpServer
  });


  let connection = singleton.connection = null;

  // WebSocket server
  return { httpServer, wsServer, connection };
});

const makeConnection = (wsServer = singleton.wsServer) => new Promise((resolve, reject) => {
  wsServer.on('request', function (request) {
    let connection = singleton.connection = request.accept(null, request.origin);
    // console.log('incoming connection from react-native');
    // This is the most important callback for us, we'll handle
    // all message here.
    connection.on('message', function (message) {
      // console.log(message);

      if (message.type === 'utf8') {
        // console.log(JSON.parse(message.utf8Data));
        // process WebSocket message
      }
    });

    connection.on('close', function (connection) {
    });

    connection.cmd = async cmd => {
      // send and get response back
      connection.sendUTF(cmd);
      return new Promise((resolve, reject) => {
        connection.once('message', function (message) {
          const parsedMessage = JSON.parse(message.utf8Data);
          if (!parsedMessage.hasError) {
            resolve(parsedMessage.response);
          } else {
            reject('Cruijff: ' + parsedMessage.error);
          }
        });
      });
    };

    resolve(connection);
  });
});

module.exports = { makeConnection, startServer, singleton };
