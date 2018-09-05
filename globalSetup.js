//
// const { Seedorf } = require('./seedorf/seedorf');
// const { installImage, runApp, stopApp, allowLocation } = require('./android');
// const { startServer, makeConnection } = require('./react-native');
// const scripts = require('./seedorf/scripts');
//
// const wait = (time) => new Promise(resolve => { setTimeout(resolve, time)} );
//
// let seedorf = null;
// let httpServer = null;
// let wsServer = null;
// let connection = null;
//
// const start = async () => {
//   const seedorf = new Seedorf('/home/tom/Projects/sportyspots/seedorf');
//   try {
//     // await seedorf.start();
//     // console.log(await seedorf.cmd('5'));
//     console.log(await seedorf.script(scripts.FLUSH_DB));
//     console.log(await seedorf.script(scripts.CREATE_TEST_USER));
//
//     // seedorf.kill();
//   } catch(e) {
//     console.log(e);
//     // seedorf.kill();
//   }
//
//   const { httpServer, wsServer } = startServer();
//
//   installImage('/home/tom/Projects/sportyspots/cruijff/android/app/build/outputs/apk/release/app-release-unsigned.apk');
//   // installImage('/home/tom/Projects/sportyspots/cruijff/android/app/build/outputs/apk/debug/app-debug.apk');
//   try {
//     stopApp();
//   } catch(e) {
//   }
//   await wait(1000);
//   allowLocation();
//   runApp();
//   const connection  = await makeConnection(wsServer);
//   await wait(1000);
//   await connection.cmd(`
//     AsyncStorage.clear()
//     refs.SplashScreen.setState({firstRun: true});
//   `);
//   await wait(1000);
//   await connection.cmd(`getElementById(refs.SplashScreen, 'startDiscoveringButton').props.onPress();`);
//   await wait(500);
//   console.log(await connection.cmd(`refs.footerNextButton.props.onPress()`));
//   await wait(500);
//   console.log(await connection.cmd(`refs.footerNextButton.props.onPress()`));
//   await wait(500);
//   console.log(await connection.cmd(`refs.footerNextButton.props.onPress()`));
//   // console.log(await connection.cmd(`refs\n`));
//   connection.close();
//   wsServer.unmount();
//   wsServer.closeAllConnections();
//   httpServer.close();
//   console.log('done?');
// };
//
// start();
