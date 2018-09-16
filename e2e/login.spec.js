const Seedorf = require('../seedorf/seedorf').Seedorf;
const scripts = require('../seedorf/scripts');

const enterEmailAndPassword = async (email, password) => {
  await element(by.id('loginInputEmail')).tap();
  await element(by.id('loginInputEmail')).typeText(email);
  await element(by.id('loginInputPassword')).tap();
  await element(by.id('loginInputPassword')).typeText(`${password}\n`);
  await element(by.id('loginSubmitButton')).tap();
};

describe('Login', () => {
  beforeAll(async () => {
    const seedorf = new Seedorf('/home/tom/Projects/sportyspots/seedorf');
    console.log(await seedorf.script(scripts.CREATE_TEST_USER));
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
    await expect(element(by.id('loginErrorText'))).toBeVisible();
  });

  it('should login on correct login', async () => {
    await enterEmailAndPassword('test@sportyspots.com', 'test123test');
    await expect(element(by.id('loginErrorText'))).toNotExist();
    await expect(element(by.id('splashText'))).toBeVisible();
    await expect(element(by.id('splashLoginButton'))).toNotExist();
  });



});

