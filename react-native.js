const WebSocketServer = require('websocket').server;
const http = require('http');

const singleton = {
  httpServer: null,
  wsServer: null,
  connection: null,
};

const startServer = () => {
  let httpServer = singleton.httpServer = http.createServer(function (request, response) {});
  httpServer.listen(8020, function () {});
  /* port 8020 is hardwired into the cruijff testing image
   * as well as server address 10.0.2.2 */

  // create the server
  let wsServer = singleton.wsServer = new WebSocketServer({
    httpServer: singleton.httpServer
  });


  let connection = singleton.connection = null;

  wsServer.on('request', function (request) {
    closeConnection();
    let connection = singleton.connection = request.accept(null, request.origin);
    connection.on('message', function (message) {
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
  });

  // WebSocket server
  return {httpServer, wsServer, connection};
};

const closeConnection = () => {
  if (singleton.connection) {
    singleton.connection.closeTimeout = 1;
    singleton.connection.close();
    singleton.connection = null;
  }
};

module.exports = { startServer, closeConnection, singleton };
