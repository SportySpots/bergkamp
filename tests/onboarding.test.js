const scripts = require('../seedorf/scripts');
const Seedorf = require('../seedorf/seedorf').Seedorf;
const wait = require('../utils').wait;
const { makeConnection, startServer } = require('../react-native');
const { installImage, stopApp, restartApp } = require('../android');

describe('Onboarding', async () => {
  let seedorf;
  let wsServer;
  let httpServer;
  let connection;

  beforeAll(async () => {
    seedorf = new Seedorf('/home/tom/Projects/sportyspots/seedorf');
    installImage('/home/tom/Projects/sportyspots/cruijff/android/app/build/outputs/apk/release/app-release-unsigned.apk');
    // installImage('/home/tom/Projects/sportyspots/cruijff/android/app/build/outputs/apk/debug/app-debug.apk');
    const servers = startServer();
    wsServer = servers.wsServer;
    httpServer = servers.httpServer;
    await restartApp();
    connection  = await makeConnection(wsServer);
    await wait(500);
  });

  afterAll(() => {
    connection.close();
    stopApp();
    wsServer.unmount();
    wsServer.closeAllConnections();
    httpServer.close();
  });

  describe('flow', async () => {
    beforeAll(async () => {
      seedorf.script(scripts.FLUSH_DB);
      await connection.cmd(`
        AsyncStorage.clear()
        refs.SplashScreen.setState({firstRun: true});
      `);
    });

    it('should start at SplashScreen', async () => {
      const navState = await connection.cmd('refs.rootNavigator.state.nav');
      expect(navState.routes[navState.index].key).toBe('SplashScreen');
    });

    it('should go to onBoarding after click', async () => {
      await connection.cmd(`getElementById(refs.SplashScreen, 'startDiscoveringButton').props.onPress();`);
      await wait(500);
      const navState = await connection.cmd('refs.rootNavigator.state.nav');
      expect(navState.routes[navState.index].key).toBe('OnboardingScreen');
    });

    it('should go through to MainNav after 3x next', async () => {
      for (let i=0; i<3; i++) {
        await connection.cmd(`refs.footerNextButton.props.onPress()`);
        await wait(500);
      }
      const navState = await connection.cmd('refs.rootNavigator.state.nav');
      expect(navState.routes[navState.index].key).toBe('MainNav');
    });
  });
});