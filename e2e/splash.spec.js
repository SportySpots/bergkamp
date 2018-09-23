describe('Splash: First run', () => {
  // beforeAll(async () => {
  //   await device.relaunchApp({delete: true});
  // });

  it('should launch onboarding on first run', async () => {
    await expect(element(by.id('splashText'))).toBeVisible();
    await element(by.id('start')).tap();
  });

  // for (let i = 1; i <= 2; i++) {
  //   it(`should go next onboarding screen after tap (${i})`, async () => {
  //     await element(by.id('footerNextButton')).tap();
  //     await expect(element(by.id('footerNextButton'))).toBeVisible();
  //   });
  // }
  // it ('should go to SpotsListScreen after onboarding', async() => {
  //   await element(by.id('footerNextButton')).tap();
  //   await expect(element(by.id('SpotsListScreen'))).toBeVisible();
  // });

});

describe.skip('SplashScreen', () => {
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
});

