const Sails = require("sails").Sails;

(async () => {
  for(let i = 0; i < 500000; i++){
    await startStop();
    if(i % 100 === 0) printUsage();
  }
})();

async function startStop() {
  await (
    new Promise((resolve, reject)=>{
      const sails = new Sails();
      sails.lift({
        hooks: {
          session: false
        },
        log: { noShip: true },
      }, (err)=>{
        if (err) {
          reject(Object.assign(new Error('Failed to lift.  See .raw.'), {raw:err}));
          return;
        }//•
        sails.lower((err)=>{
          if (err) {
            reject(Object.assign(new Error('Failed to lower.  See .raw.'), {raw:err}));
            return;
          }//•
          resolve();
        });//_∏_
      });//_∏_
    });//_∏_
  );
}

function printUsage() {
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log(`Process uses ${used.toFixed(2)} MB`);
}

