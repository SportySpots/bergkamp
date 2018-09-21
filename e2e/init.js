const detox = require('detox');
const adapter = require('detox/runners/jest/adapter');
const wait = require('../utils').wait;
const config = require('../package.json').detox;
const { startServer, closeConnection, singleton } = require('../react-native');

jest.setTimeout(120000);
jasmine.getEnv().addReporter(adapter);
jestExpect = expect;

beforeAll(async () => {
  startServer();
  await detox.init(config);
});

beforeEach(async () => {
  await adapter.beforeEach();
});

afterEach(async () => {
  // closeConnection();
});

afterAll(async () => {
  await adapter.afterAll();
  await detox.cleanup();
  const { wsServer, httpServer } = singleton;
  closeConnection();
  if (wsServer) {
    wsServer.unmount();
    wsServer.closeAllConnections();
  }
  if (httpServer) {
    httpServer.close();
  }
  await wait(1000);
});