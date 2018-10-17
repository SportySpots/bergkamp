const scripts = require('../seedorf/scripts');
const config = require('../config');
const wait = require('../utils').wait;
const quickLogin = require('./helpers').quickLogin;
const Seedorf = require('../seedorf/seedorf').Seedorf;

const { singleton } = require('../react-native');

describe('CancelGame', () => {
  let gamesData;
  let seedorf;
  beforeAll(async () => {
    seedorf = new Seedorf(config.seedorfPath);
    await seedorf.script(scripts.FLUSH_DB);
    await seedorf.script(scripts.CREATE_TEST_USER);
    await seedorf.script(scripts.CREATE_CANCELABLE_GAME);
    await quickLogin();
    await element(by.id('start')).tap();
    await element(by.id('navbarButton_join')).tap();
    gamesData = await singleton.connection.cmd('refs["gamesFlatList"].props.data');
    await element(by.id('game_'+gamesData[0].uuid)).tap();
  });

  it('goes to game details when game is tapped', async () => {
    await expect(element(by.id('gameDetails'))).toBeVisible();
  });

  it('can tap admin menu', async() => {
    await element(by.id('gameAdminMenuTrigger')).tap();
  });

  it('can tap cancel button in menu', async () => {
    await element(by.text('Annuleer activiteit')).tap();
  });

  it('can press Cancel button', async() => {
    await element(by.id('cancelGameFormCancelButton')).tap();
  });

  it('cancels when confirmed', async() => {
    await element(by.text('JA')).tap();
    await seedorf.script(`
from seedorf.games.models import Game
game = Game.objects.first()
assert game.status == Game.STATUS_CANCELED, 'Seedorf: Game status is not canceled (%s)' % game.status
`);
  });

});
