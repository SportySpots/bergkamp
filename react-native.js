const util = require('util');
const WebSocketServer = require('websocket').server;
const http = require('http');

// var adb = require('adbkit');
// var client = adb.createClient()

// client.listDevices()
//   .then(function(devices) {
//     console.log(devices);
//   })
//   .catch(function(err) {
//     console.error('Something went wrong:', err.stack)
//   })
//
//

const startServer = () => {
  const httpServer = http.createServer(function (request, response) {
    // process HTTP request. Since we're writing just WebSockets
    // server we don't have to implement anything.
  });

  /* port 8020 is hardwired into the cruijff testing apk
   * as well as server address 10.0.2.2 */
  httpServer.listen(8020, function () {

  });

  // create the server
  const wsServer = new WebSocketServer({
    httpServer: httpServer
  });


  const connection = null;

  // WebSocket server
  return { httpServer, wsServer, connection };
};

const makeConnection = (wsServer) => new Promise((resolve, reject) => {
  wsServer.on('request', function (request) {
    const connection = request.accept(null, request.origin);

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

module.exports = { makeConnection, startServer };
