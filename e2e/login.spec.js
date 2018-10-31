const Seedorf = require('../seedorf/seedorf').Seedorf;
const scripts = require('../seedorf/scripts');
const config = require('../config');

const enterEmailAndPassword = async (email, password) => {
  await element(by.id('loginInputEmail')).tap();
  await element(by.id('loginInputEmail')).typeText(email);
  await element(by.id('loginInputPassword')).tap();
  await element(by.id('loginInputPassword')).typeText(`${password}\n`);
  await element(by.id('loginSubmitButton')).tap();
};



describe('Login', () => {
  beforeAll(async () => {
    const seedorf = new Seedorf(config.seedorfPath);
    await seedorf.script(scripts.FLUSH_DB);
    await seedorf.script(scripts.CREATE_TEST_USER);
  });

  beforeEach(async () => {
    await device.reloadReactNative();
    await element(by.id('splashLoginButton')).tap();
  });

  it('should go to login screen on button press', async () => {
    await expect(element(by.id('LoginScreen'))).toBeVisible();
  });

  it('should show login Error on error', async () => {
    await enterEmailAndPassword('tom@sportyspots.com', 'password123');
    await expect(element(by.text('Geen geldige e-mail of wachtwoord'))).toBeVisible();
  });

  it('should login on correct login', async () => {
    await enterEmailAndPassword('test@sportyspots.com', 'test123test');
    await expect(element(by.text('Geen geldige e-mail of wachtwoord'))).toNotExist();
    await expect(element(by.id('SpotsListScreen'))).toBeVisible();
  });

});

