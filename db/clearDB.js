const { exec } = require('child_process');
var MONGO = require('./mongoIndex');
const cpuCount = require('os').cpus().length;

//========
//starts the process
var startProcess = () => {
    var promise = new Promise(
      (resolve) => {
        exec('rm dummyData.csv', (err, result) => {
          if(err) console.log('dummyData.csv already does not exist');
          else console.log('dummyData.csv was deleted');
          console.log();
        });   
        for (let i = 1; i <= cpuCount; i++) {
            exec(`rm dummyData${i}.csv`, (err, result) => {
              if(err) console.log(`dummyData${i}.csv already does not exist`);
              else console.log(`dummyData${i}.csv was deleted`);
              console.log();
              if (i === cpuCount) resolve();
            });   
        }
      }
    )

    promise.then(function() {
      MONGO.drop(() => {
        MONGO.closeConnection();
        console.log('Dropped Collection Listings-Collection');
        console.log();
        console.log('*******************');
        console.log('ready to seed MONGO')
        console.log('*******************');
        console.log();
      })
    });
  }
  
  startProcess();