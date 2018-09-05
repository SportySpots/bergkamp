const fs = require('fs');
const wait = require('./utils').wait;
const execSync = require('child_process').execSync;

const uninstallImage = () => {
  execSync('adb uninstall com.sportyspots.android');
};

const installImage = (path) => {
  if (!fs.existsSync(path)) {
    throw new Error('installImage: path not found');
  }
  try {
    uninstallImage();
  } catch(e) {

  }
  execSync(`adb install ${path}`);
};

const runApp = () => {
  execSync(`adb shell pm grant com.sportyspots.android android.permission.SYSTEM_ALERT_WINDOW`);
  execSync(`adb shell "am start -n com.sportyspots.android/com.sportyspots.android.MainActivity"`);
};

const stopApp = () => {
  execSync('adb shell "am force-stop com.sportyspots.android"');
};

const restartApp = async () => {
  try {
    stopApp();
  } catch(e) {
  }
  await wait(1000);
  allowLocation();
  runApp();
};

const allowLocation = () => {
  execSync('adb shell pm grant com.sportyspots.android android.permission.ACCESS_FINE_LOCATION');
};

module.exports = {
  uninstallImage,
  installImage,
  runApp,
  stopApp,
  restartApp,
  allowLocation
};
