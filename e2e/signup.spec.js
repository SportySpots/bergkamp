const Seedorf = require('../seedorf/seedorf').Seedorf;
const scripts = require('../seedorf/scripts');
const config = require('../config');
const wait = require('../utils').wait;

const { singleton } = require('../react-native');

const enterDetails = async (firstName, lastName, email, password) => {
  await element(by.id('signupFieldFirstName')).tap();
  await element(by.id('signupFieldFirstName')).typeText(firstName + '\n');
  await wait(100);
  await element(by.id('signupFieldLastName')).typeText(lastName + '\n');
  await wait(100);
  await element(by.id('signupFieldEmail')).typeText(email + '\n');
  await wait(100);
  await element(by.id('signupFieldPassword')).typeText(`${password}\n`);
  await wait(100);
};

describe('Signup', () => {
  let seedorf;
  beforeAll(async () => {
    seedorf = new Seedorf(config.seedorfPath);
    await seedorf.script(scripts.FLUSH_DB);
  });

  beforeEach(async () => {
    await device.reloadReactNative();
    await element(by.id('start')).tap();
    await element(by.id('navbarButton_profile')).tap();
    await element(by.id('profileButtonSignup')).tap();
  });

  it('shows error on short password', async () => {
    await expect(element(by.id('signupScrollView'))).toBeVisible();
    await enterDetails('Test', 'User', 'test@sportyspots.com', 't');
    await element(by.id('signupScrollView')).scrollTo('bottom');
    await element(by.id('signupButtonSubmit')).tap();

    await expect(element(by.id('passwordError'))).toBeVisible();
  });

  it('shows error on wrong email', async () => {
    await expect(element(by.id('signupScrollView'))).toBeVisible();
    await enterDetails('Test', 'User', 'email', 'test123test');
    await element(by.id('signupScrollView')).scrollTo('bottom');
    await element(by.id('signupButtonSubmit')).tap();

    await expect(element(by.id('emailError'))).toBeVisible();
  });

  it('should go to profile details after succesful signup', async () => {
    await expect(element(by.id('signupScrollView'))).toBeVisible();
    await enterDetails('Test', 'User', 'test@sportyspots.com', 'test123test');
    await element(by.id('signupScrollView')).scrollTo('bottom');
    await element(by.id('signupButtonSubmit')).tap();

    await expect(element(by.id('ProfileDetailsScreen'))).toBeVisible();
    const token = await singleton.connection.cmd('AsyncStorage.getItem("TOKEN")');
    jestExpect(typeof token).toBe('string');
    await seedorf.script(`
from seedorf.users.models import User
user = User.objects.first()
assert user.first_name == 'Test'
assert user.last_name == 'User'
`);
    // cleanup: relaunchApp with delete will clear AsyncStorage (logout user)
    await device.relaunchApp({delete: true});
  });

  it('shows error when email exists', async () => {
    await expect(element(by.id('signupScrollView'))).toBeVisible();
    await enterDetails('Test', 'User', 'test@sportyspots.com', 'test123test');
    await element(by.id('signupScrollView')).scrollTo('bottom');
    await element(by.id('signupButtonSubmit')).tap();
    await expect(element(by.id('emailError'))).toBeVisible();
  });
});

