const { Python } = require('../python');

class Seedorf {
  constructor(path) {
    this.path = path;
    this.python = new Python('python ' + path + '/manage.py shell');
  }
  start() {
    return this.python.start();
  }
  kill() {
    return this.python.kill();
  }
  cmd(c) {
    return this.python.cmd(c);
  }
  script(c) {
    return Python.script(c, 'python ' + this.path + '/manage.py shell');
  }

}

module.exports.Seedorf = Seedorf;