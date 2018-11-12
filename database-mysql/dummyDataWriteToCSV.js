//======================================
//estimated time to completion: 30.32 minutes
//======================================
const { exec } = require('child_process');
const { buildPar } = require('./randomData.js');
var faker = require('faker');
var db = require('./index.js');
var fs = require('fs');
var runSchema = require('./runSchema.js');

//======================================
//constructor function that generates random realistic data
function Data() {
  this.name = faker.name.findName();
  this.roomType = [
    'ENTIRE APARTMENT',
    'ENTIRE LOFT',
    'PRIVATE ROOM IN TOWNHOUSE',
    'PRIVATE ROOM IN APARTMENT',
    'PRIVATE ROOM',
    'PRIVATE ROOM IN GUEST SUITE'
  ];
  this.roomType = this.roomType[Math.floor(Math.random() * this.roomType.length)];
  this.roomTypeDetails = buildPar(40);
  this.city = faker.address.city();
  this.cityDetails = buildPar(375);
  this.listingDetails = buildPar(600);
  this.guestAccessDetails = buildPar(450);
  this.interactionGuestsDetails = buildPar(300);
  this.otherDetails = buildPar(250);
};
//======================================
//helper function that builds an array of data rows that are then passed to the insertAny function
var saveRows = (numOfRows, callback) => {
  var str = '';
  for (var i =0; i < numOfRows; i++) {
    var data = new Data;
    // arr.push([JSON.stringify(data.name), JSON.stringify(data.roomType), JSON.stringify(data.roomTypeDetails), JSON.stringify(data.city), JSON.stringify(data.cityDetails), JSON.stringify(data.listingDetails), JSON.stringify(data.guestAccessDetails), JSON.stringify(data.interactionGuestsDetails), JSON.stringify(data.otherDetails), '\n']);
    str = str + data.name + ', ' + data.roomType + ', ' + data.roomTypeDetails + ', ' + data.city + ', ' + data.cityDetails + ', ' + data.listingDetails + ', ' + data.guestAccessDetails + ', ' + data.interactionGuestsDetails + ', ' + data.otherDetails + ',' + '\n';
  }
  str = str + '\n';
  // fs.appendFile('./dummyData.csv', str, (err) => {
  //   if(err) throw err;
  //   count += numOfRows;
  //   callback();
  // })
  // count += numOfRows;
  // callback();
  let stream = fs.createWriteStream('./dummyData.csv');
  stream.write(str);
  stream.on('finish', () => {
    count += numOfRows;
    callback()});
  stream.end( () => {});
}
//======================================
//object with start and stop methods that can be invoked to measure elapsed time
var timer = {};
timer.start = () => {
  timer.today = new Date();
  timer.startMinutes = ((timer.today.getHours() * 60) + timer.today.getMinutes());
  timer.startSeconds = timer.today.getSeconds();
  timer.startMilliseconds = timer.today.getMilliseconds();
};
timer.stop = () => {
  timer.today = new Date();
  timer.minutes = ((timer.today.getHours() * 60) + timer.today.getMinutes()) - timer.startMinutes;
  timer.seconds = timer.today.getSeconds() - timer.startSeconds;
  timer.milliseconds = timer.today.getMilliseconds() - timer.startMilliseconds;
  if (timer.seconds < 0) {
    timer.minutes -= 1;
    timer.seconds = 60 + timer.seconds;
  }
  if (timer.milliseconds < 0) {
    timer.seconds -= 1;
    timer.milliseconds = 999 + timer.milliseconds;
  }
  console.log('time elapsed:', timer.minutes, 'm : ', timer.seconds, 's : ', timer.milliseconds, 'ms');
};
//======================================
//function that inserts the specified number of rows, and global variables
var count = 0;
var totalSize = 100000;
var wrapper = () => {
  if(count === 0) timer.start();
  //========
  //base case: if total size is reached, log the count and the time elapsed, exit the function
  if(count >= totalSize) {
    console.log('count complete: ', count);
    timer.stop();
    return;
  }
  //========
  //promise that resolves when a batch is done inserting
  var promise = new Promise(
    function(resolve) {
      saveRows(125, () => {
          resolve();
      });
  });
  //========
  //recurses when promise resolves
  promise.then(function() {
    wrapper();
  });
}
//========
//starts the process
var promise = new Promise(
  (resolve) => {
    exec('rm dummyData.csv', (err, result) => {
      if(err) console.log('dummyData.csv already does not exist');
      else console.log('dummyData.csv was deleted');
      console.log();
      console.log('Building Schema:')
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
  wrapper();
});
