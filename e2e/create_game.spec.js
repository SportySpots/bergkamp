const scripts = require('../seedorf/scripts');
const config = require('../config');
const wait = require('../utils').wait;
const quickLogin = require('./helpers').quickLogin;
const Seedorf = require('../seedorf/seedorf').Seedorf;

const { singleton } = require('../react-native');

describe('CreateGame', () => {
  let seedorf;
  beforeAll(async () => {
    seedorf = new Seedorf(config.seedorfPath);
    await seedorf.script(scripts.FLUSH_DB);
    await seedorf.script(scripts.CREATE_TEST_USER);
    await seedorf.script(scripts.CREATE_TEST_SPOT);
    await quickLogin();
    await element(by.id('start')).tap();
    await element(by.id('navbarButton_organize')).tap();
  });

  it('can pick a sport', async () => {
    await element(by.id('pickSport')).tap();
    await element(by.id('sport_0')).tap();
    const state = await singleton.connection.cmd('refs["PlanGameScreen"].state');
    jestExpect(state).toHaveProperty('sport.uuid');
    jestExpect(state).toHaveProperty('sport.name');
  });

  it('can pick a date', async () => {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    await element(by.id('pickDate')).tap();
    await element(by.text(''+currentDay)).tap();
    await element(by.text('Ok')).tap();
    const state = await singleton.connection.cmd('refs["PlanGameScreen"].state');
    jestExpect(state).toHaveProperty('date.year', currentDate.getFullYear());
    jestExpect(state).toHaveProperty('date.month', currentDate.getMonth()+1);
    jestExpect(state).toHaveProperty('date.day', currentDay);
  });

  it('can pick a time', async () => {
    await element(by.id('pickTime')).tap();
    await element(by.text('OK')).tap();
    const state = await singleton.connection.cmd('refs["PlanGameScreen"].state');
    jestExpect(state.time).not.toBeNull();
  });

  it('can pick a duration', async () => {
    await element(by.id('pickDuration')).tap();
    await element(by.text('2 uur')).tap();
    const state = await singleton.connection.cmd('refs["PlanGameScreen"].state');
    jestExpect(state.duration).toBe(120);
    await wait(1000);
  });

  it('can pick a capacity', async () => {
    await element(by.id('pickCapacity')).tap();
    await element(by.text('4')).tap();
    await element(by.id('capacityPlus')).tap();
    await element(by.id('capacityPlus')).tap();
    await element(by.id('capacityPlus')).tap();
    await element(by.id('capacityMinus')).tap();
    await element(by.text('Ok')).tap();
    const state = await singleton.connection.cmd('refs["PlanGameScreen"].state');
    jestExpect(state.capacity).toBe(6);
  });

  it('can go to next screen', async () => {
    await element(by.id('footerNextButton')).tap();
  });

  it('can pick a spot', async () => {
    await element(by.id('pickSpot_0')).atIndex(1).tap();
    await element(by.id('pickSpot_0')).atIndex(0).tap();
    const state = await singleton.connection.cmd('refs["PlanGameScreen"].state');
    jestExpect(state).toHaveProperty('spot.uuid');
    jestExpect(state).toHaveProperty('spot.name');
  });

  it('can go to next screen', async () => {
    await element(by.id('footerNextButton')).tap();
  });

  it('can type description', async () => {
    const description = 'Some short description\n';
    await element(by.id('description')).typeText(description);
    await element(by.id('footerNextButton')).tap();
    const state = await singleton.connection.cmd('refs["PlanGameScreen"].state');
    console.log(state);
    jestExpect(state.description).toBe(description);
  });

  it('should have been created', async () => {
    const result = JSON.parse(await seedorf.script(`
from seedorf.games.models import Game
from seedorf.games.serializers import GameSerializer
from rest_framework.renderers import JSONRenderer
print(JSONRenderer().render(GameSerializer(Game.objects.first()).data).decode('utf-8'))
    `));
    jestExpect(result.description).toBe('Some short description');
    jestExpect(result.capacity).toBe(6);
  });

});
