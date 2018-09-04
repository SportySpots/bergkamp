const { Seedorf } = require('./seedorf');
const { installImage, runApp, stopApp } = require('./android');
const { startServer, makeConnection } = require('./react-native');

const wait = (time) => new Promise(resolve => { setTimeout(resolve, time)} );

const start = async () => {
  // const seedorf = new Seedorf('/home/tom/Projects/sportyspots/seedorf');
  // try {
  //   await seedorf.start();
  //   console.log(await seedorf.cmd('5'));
  //   console.log(await seedorf.script('print(6)'));
  //
  //   seedorf.kill();
  // } catch(e) {
  //   console.log(e);
  //   seedorf.kill();
  // }

  const { wsServer } = startServer();

  // installImage('/home/tom/Projects/sportyspots/cruijff/android/app/build/outputs/apk/release/app-release-unsigned.apk');
  try {
    stopApp();
  } catch(e) {
  }
  runApp();
  const connection  = await makeConnection(wsServer);
  connection.sendUTF(
    `expect(1).toBe(2)`
  );
};

console.log('test');
start();
