const { exec } = require('child_process');
var runSchema = require('./runSchema.js');
var {drop} = require('./mongoIndex');


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
      console.log('ready to seed MYSQL');
      drop(() => {
        console.log('ready to seed MONGO')
      })
    });
  }
  
  startProcess();