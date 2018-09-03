const { Seedorf } = require('./seedorf');

const start = async () => {
  const seedorf = new Seedorf('/home/tom/Projects/sportyspots/seedorf');
  try {
    await seedorf.start();
    console.log(await seedorf.cmd('5'));
    console.log(await seedorf.script('print(6)'));

    seedorf.kill();
  } catch(e) {
    console.log(e);
    seedorf.kill();
  }

};

start();
