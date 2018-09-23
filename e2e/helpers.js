const config = require('../config');
const Seedorf = require('../seedorf/seedorf').Seedorf;
const scripts = require('../seedorf/scripts');
const { singleton } = require('../react-native');

const login = async() => {
  await element(by.id('splashLoginButton')).tap();
  await element(by.id('loginInputEmail')).tap();
  await element(by.id('loginInputEmail')).typeText('test@sportyspots.com');
  await element(by.id('loginInputPassword')).tap();
  await element(by.id('loginInputPassword')).typeText('test123test\n');
  await element(by.id('loginSubmitButton')).tap();
};

/* logs in without using the GUI */
const quickLogin = async() => {
  const seedorf = new Seedorf(config.seedorfPath);
  const jwt = (await seedorf.script(scripts.GET_JWT)).trim();
  await singleton.connection.cmd(`AsyncStorage.setItem('TOKEN', '${jwt}')`);
  await device.reloadReactNative();
};

module.exports = {login, quickLogin};