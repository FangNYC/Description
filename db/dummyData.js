//======================================
//estimated time to completion: 30.32 minutes
//======================================
const { exec } = require('child_process');
const random = require('./randomData.js');
const faker = require('faker');
const db = require('./index.js');
const fs = require('fs');
const runSchema = require('./runSchema.js');
const DBMS = require('./DBMS.js');
const cluster = require('cluster');
const cpuCount = require('os').cpus().length;
var workerNum;
var startId;

//======================================
//constructor function that generates random realistic data
function Data() {
  this.name = random.buildName();
  this.roomType = random.buildRoom();
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
    count++
    var id = startId + count;
    str = str + id + ', ' + data.name + ', ' + data.roomType + ', ' + data.roomTypeDetails + ', ' + data.city + ', ' + data.cityDetails + ', ' + data.listingDetails + ', ' + data.guestAccessDetails + ', ' + data.interactionGuestsDetails + ', ' + data.otherDetails + ',' + '\n';
  }
  let stream = fs.createWriteStream(`./dummyData${workerNum}.csv`, {flags: 'a'});
  stream.write(str);
  stream.end( () => {
    // count += numOfRows;
      callback();
  });
}
//======================================
//object with start and stop methods that can be invoked to measure elapsed time
var timer = {};
timer.start = () => {
  this.today = new Date();
  this.startMinutes = ((this.today.getHours() * 60) + this.today.getMinutes());
  this.startSeconds = this.today.getSeconds();
  this.startMilliseconds = this.today.getMilliseconds();
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
var totalSize = 10000000;
totalSize = totalSize / cpuCount;
var dbms = 'mongo';
var wrapper = () => {
  if(count === 0) {
    console.log('wrapper was invoked');
    process.send({start: 'start'})
  }
  //========
  //base case: if total size is reached, log the count and the time elapsed, exit the function
  if(count >= totalSize) {
    process.send({
      stop: 'stop',
      id: process.pid,
      count
    })
    process.kill(process.pid, 'SIGKILL');
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
  console.log(`worker running on thread #${process.pid}`)
  var promise = new Promise ( (resolve) => {
    process.on('message', (msg) => {
      if (msg.num) {
        workerNum = msg.num;
        resolve();
      }
    })
  })
  if (dbms === 'mysql') {
    runSchema.useDB(
    () => {
      console.log('using listings database')
    });
  }
  process.send({test: 5})
  promise.then(() => {
    startId = totalSize * (workerNum - 1);
    console.log('startId', startId)
    wrapper()
  });
} else {
  //master
  var workers = [];
  for (let i = 0; i < cpuCount; i++) {
    console.log(`worker ${i + 1} initiated`)
    var worker = cluster.fork();
    worker.send({num : i+1})
    worker.on('message', (msg) => {
      if(msg.start) {
        timer.start();
      }
      if(msg.stop) {
        timer.stop();
      }
      if(msg.id && msg.count) {
        workers.push(msg.id);
        console.log('worker #', workers.length)
        DBMS.insertFromCSV(dbms, `dummyData${i+1}`, () => {
          console.log('count complete: ', (msg.count));
          timer.stop();
        })
      }
    })
  }
}
