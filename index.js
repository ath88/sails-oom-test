const Sails = require("sails").Sails;

(async () => {
  for(let i = 0; i < 500000; i++){
    await startStop();
    if(i % 100 === 0) printUsage();
  }
})();

async function startStop() {
  const sails = new Sails();
  await sails.lift({ log: { noShip: true }, session: { secret: 'x' } });
  await sails.lower();
}

function printUsage() {
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log(`Process uses ${used.toFixed(2)} MB`);
}

