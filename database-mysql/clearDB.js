const { exec } = require('child_process');
var runSchema = require('./runSchema.js');
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
          console.log('Building MYSQL Schema:')
        });
        runSchema.runSchema(
          () => {
            resolve();
          }
        );
        
      }
    )
    
    promise.then(function() {
      console.log();
      console.log('*******************');
      console.log('ready to seed MYSQL')
      console.log('*******************');
      console.log();
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