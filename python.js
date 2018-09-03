const { spawn, exec } = require('child_process');

class Python {
  static async script(arg, pythonCmd = 'python') {
    let process = null;
    const processPromise = new Promise((resolve, reject) => {
      process = exec(pythonCmd, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        }
        resolve({stdout, stderr});
      })
    });
    process.stdin.write(arg);
    process.stdin.end();
    const { stdout, stderr } = await processPromise;
    return stdout;
  }
  async _waitStdout() {
    return new Promise(resolve => this.process.stdout.once('data', resolve));
  }
  async cmd(arg) {
    if (!this.process) {
      throw new Exception('Call start() first before using `cmd`');
    }

    this.process.stdin.write(arg + "\n");

    let out = [];
    while (!(/^.*In.*/m.test(out[out.length-1]))) {
      out.push(await this._waitStdout());
    }
    return out[out.length - 2];
  }
  async kill() {
    this.process.kill();
    this.process = null;
  }
  async start() {
    const args = this.pythonCmd.split(' ');
    this.process = spawn(args[0], args.slice(1));
    this.process.stdout.setEncoding('utf8');
    this.process.stderr.setEncoding('utf8');
    this.process.stderr.once('data', err => { throw new Error(err) });
    while (!(await this._waitStdout()).includes('In [1]:'));
  }
  constructor(pythonCmd = 'ipython') {
    this.pythonCmd = pythonCmd;
  }
}

module.exports.Python = Python;