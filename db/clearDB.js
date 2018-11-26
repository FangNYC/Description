const { exec } = require('child_process');
var MONGO = require('./mongoIndex');

//========
//starts the process
var startProcess = () => {
    var promise = new Promise(
      (resolve) => {
        exec('rm dummyData.csv', (err, result) => {
          if(err) console.log('dummyData.csv already does not exist');
          else console.log('dummyData.csv was deleted');
          console.log();
          resolve();
        });   
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