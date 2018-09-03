// const util = require('util');
// const exec = util.promisify(require('child_process').exec);
//
// var adb = require('adbkit')
// var client = adb.createClient()
//
// client.listDevices()
//   .then(function(devices) {
//     console.log(devices);
//   })
//   .catch(function(err) {
//     console.error('Something went wrong:', err.stack)
//   })
//
//
// async function ls() {
//   const { stdout, stderr } = await exec('echo bladiebla | cat');
//   console.log('stdout:', stdout);
//   console.log('stderr:', stderr);
// }
// ls();
//
//
// var WebSocketServer = require('websocket').server;
// var http = require('http');
//
// var server = http.createServer(function(request, response) {
//   // process HTTP request. Since we're writing just WebSockets
//   // server we don't have to implement anything.
// });
// server.listen(1337, function() { });
//
// // create the server
// wsServer = new WebSocketServer({
//   httpServer: server
// });
//
// // WebSocket server
// wsServer.on('request', function(request) {
//   var connection = request.accept(null, request.origin);
//
//   // This is the most important callback for us, we'll handle
//   // all messages from users here.
//   connection.on('message', function(message) {
//     console.log(message);
//     if (message.type === 'utf8') {
//       // process WebSocket message
//     }
//   });
//
//   connection.on('close', function(connection) {
//     // close user connection
//   });
// });