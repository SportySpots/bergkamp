const wait = require('../utils').wait;


describe('First run', () => {
  // beforeAll(async () => {
  //   await device.relaunchApp({delete: true});
  // });

  it('should got to onboarding on first run', async () => {
    await expect(element(by.id('splashText'))).toBeVisible();
    await element(by.id('start')).tap();
  });

  it('should show SpotsListScreen after 3x tap', async () => {
    await element(by.id('footerNextButton')).tap();
    await element(by.id('footerNextButton')).tap();
    await element(by.id('footerNextButton')).tap();
    await expect(element(by.id('SpotsListScreen'))).toBeVisible();
  });

  // it('should show world screen after tap', async () => {
  //   await element(by.id('world_button')).tap();
  //   await expect(element(by.text('World!!!'))).toBeVisible();
  // });
});



describe('SplashScreen', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show Splash Screen', async () => {
    await expect(element(by.id('splashText'))).toBeVisible();
  });

  it('should show SpotsListScreen after tap', async () => {
    await element(by.id('start')).tap();
    await expect(element(by.id('SpotsListScreen'))).toBeVisible();
  });

  // it('should show world screen after tap', async () => {
  //   await element(by.id('world_button')).tap();
  //   await expect(element(by.text('World!!!'))).toBeVisible();
  // });
});

