const fs = require('fs');
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
  execSync(`adb shell "am start -n com.sportyspots.android/com.sportyspots.android.MainActivity"`);
};


const stopApp = () => {
  execSync('adb shell "am force-stop com.sportyspots.android"');
};

module.exports = {
  uninstallImage,
  installImage,
  runApp,
  stopApp,
};
