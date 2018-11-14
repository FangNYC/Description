//======================================
//estimated time to completion: 30.32 minutes
//======================================
const { exec } = require('child_process');
const random = require('./randomData.js');
var faker = require('faker');
var db = require('./index.js');
var fs = require('fs');
var runSchema = require('./runSchema.js');



var cluster = require('cluster');




//======================================
//constructor function that generates random realistic data
function Data() {
  this.name = random.buildName();
  this.roomType = random.buildRoom;
  this.roomType = this.roomType[Math.floor(Math.random() * this.roomType.length)];
  this.roomTypeDetails = random.buildPar(40);
  this.city = faker.address.city();
  this.cityDetails = random.buildPar(375);
  this.listingDetails = random.buildPar(600);
  this.guestAccessDetails = random.buildPar(450);
  this.interactionGuestsDetails = random.buildPar(300);
  this.otherDetails = random.buildPar(250);
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
  //str = str + '\n';

  // fs.appendFile('./dummyData.csv', str, (err) => {
  //   if(err) throw err;
  //   count += numOfRows;
  //   callback();
  // })
  // count += numOfRows;
  // callback();
  let stream = fs.createWriteStream(`./dummyData${uniqueId}.csv`, {flags: 'a'});
  stream.write(str);
  // stream.on('finish', () => {
  //   count += numOfRows;
  //   callback();
  //   });
  stream.end( () => {
    count += numOfRows;
      callback();
  });
}
//======================================
//object with start and stop methods that can be invoked to measure elapsed time
var timer = {};
// var uniqueId = 1;
timer.start = () => {
  this.today = new Date();
  this.startMinutes = ((this.today.getHours() * 60) + this.today.getMinutes());
  this.startSeconds = this.today.getSeconds();
  this.startMilliseconds = this.today.getMilliseconds();
  // uniqueId = (this.startMinutes * 100000) + (this.startSeconds * 1000) + this.startMilliseconds;
  //console.log('start time:', this.startMinutes, 'm : ', this.startSeconds, 's : ', this.startMilliseconds, 'ms');
};
timer.stop = () => {
  this.today = new Date();
  this.minutes = ((this.today.getHours() * 60) + this.today.getMinutes()) - this.startMinutes;
  this.seconds = this.today.getSeconds() - this.startSeconds;
  this.milliseconds = this.today.getMilliseconds() - this.startMilliseconds;
  if (this.seconds < 0) {
    this.minutes -= 1;
    this.seconds = 60 + this.seconds;
  }
  if (this.milliseconds < 0) {
    this.seconds -= 1;
    this.milliseconds = 999 + this.milliseconds;
  }
  console.log('time elapsed:', this.minutes, 'm : ', this.seconds, 's : ', this.milliseconds, 'ms');
};

//======================================
//function that inserts the specified number of rows, and global variables
var count = 0;
var totalSize = 200000;
var wrapper = () => {
  if(count === 0) {
    console.log('wrapper was invoked');
    timer.start();
    // var uniqueId = parseInt(timer.startMinutes) * parseInt(timer.startMilliseconds) * parseInt(timer.startSeconds);
    // console.log('unique id: ', uniqueId)
  }
  //========
  //base case: if total size is reached, log the count and the time elapsed, exit the function
  if(count >= totalSize) {
    timer.stop();
    db.insertFromCSV(`dummyData${uniqueId}`, () => {
      console.log('count complete: ', count);
      timer.stop();
    })
    return;
  }
  //========
  //promise that resolves when a batch is done inserting
  var promise = new Promise(
    function(resolve) {
      saveRows(250, () => {
          resolve();
      });
  });
  //========
  //recurses when promise resolves
  promise.then(function() {
    wrapper();
  });
}



//start process on multiple cores
if (cluster.isWorker) {
  //invoke process
  console.log(`worker ${process.pid} is running`)
  var uniqueId = process.pid;
  runSchema.useDB(
    () => {
      console.log('using listings database')
    });
  wrapper();
} else {
  //master
  console.log('worker 1 initiated')
  cluster.fork();
  console.log('worker 2 initiated')
  cluster.fork();
}