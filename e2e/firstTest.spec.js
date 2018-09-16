const { makeConnection } = require('../react-native');

describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
    await makeConnection();
  });

  it('should have welcome screen', async () => {
    await expect(element(by.id('splashScreen'))).toBeVisible();
  });

  it('should show hello screen after tap', async () => {
    await element(by.id('start')).tap();
    await expect(element(by.text('Start met ontdekken'))).toBeVisible();
  });

  it('should show world screen after tap', async () => {
    await element(by.id('world_button')).tap();
    await expect(element(by.text('World!!!'))).toBeVisible();
  });
})
