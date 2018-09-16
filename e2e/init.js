const detox = require('detox');
const config = require('../package.json').detox;
const adapter = require('detox/runners/jest/adapter');

const { startServer, connection, singleton } = require('../react-native');

jest.setTimeout(5000);
jasmine.getEnv().addReporter(adapter);

beforeAll(async () => {
  await detox.init(config);
  startServer();
});

beforeEach(async () => {
  await adapter.beforeEach();
});

afterAll(async () => {
  await adapter.afterAll();
  await detox.cleanup();
  const { connection, wsServer, httpServer } = singleton;
  if (connection) connection.close();
  if (wsServer) {
    wsServer.unmount();
    wsServer.closeAllConnections();
  }
  if (httpServer) {
    httpServer.close();
  }
});