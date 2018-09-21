const scripts = require('../seedorf/scripts');
const config = require('../config');
const Seedorf = require('../seedorf/seedorf').Seedorf;

const { singleton } = require('../react-native');

describe('GamesList', () => {
  let gamesData;
  beforeAll(async () => {
    await device.reloadReactNative();
    const seedorf = new Seedorf(config.seedorfPath);
    await seedorf.script(scripts.FLUSH_DB);
    await seedorf.script(scripts.CREATE_TEST_GAME);
    await seedorf.script(scripts.CREATE_TEST_GAME);
    await seedorf.script(scripts.CREATE_TEST_GAME);
    await element(by.id('start')).tap();
  });

  it('should show games list', async () => {
    await element(by.id('navbarButton_join')).tap();
  });

  it('has three games', async () => {
    gamesData = await singleton.connection.cmd('refs["gamesFlatList"].props.data');
    jestExpect(gamesData).toHaveLength(3);
  });

  it('can swipe', async () => {
    await element(by.id('gamesFlatList')).swipe('up', 'slow', 1);
    await element(by.id('gamesFlatList')).scrollTo('top');
  });

  it('goes to game details when game is tapped', async () => {
    await element(by.id('game_'+gamesData[0].uuid)).tap();
    await expect(element(by.id('gameDetails'))).toBeVisible();
  });

  it('shows the correct tapped game', async () => {
    const gameProps = await singleton.connection.cmd('refs["gameDetails"].props');
    jestExpect(gameProps.game.uuid).toBe(gamesData[0].uuid);
  });

});
