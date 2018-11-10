//======================================
//estimated time to completion: 30.32 minutes
//======================================
var faker = require('faker');
var db = require('./index.js');
var fs = require('fs');
//======================================
//helper function that builds paragraphs of a specified character length
var buildPar = (char) => {
  var par = '';
  var recurse = () => {
    if (par.length >= char) {
      return;
    } else {
      par = par + faker.lorem.sentence() + ' ';
      recurse();
    }
  };
  recurse();
  return par;
};
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
//function that inserts the specified number of rows, and global variables
var today = new Date();
var startMinutes = ((today.getHours() * 60) + today.getMinutes());
var startSeconds = today.getSeconds();
var startMilliseconds = today.getMilliseconds();
//========
//
var count = 0;
var totalSize = 1000000;
var wrapper = () => {
  //========
  //base case: if total size is reached, log the count and the time elapsed, exit the function
  if(count >= totalSize) {
    console.log('count complete: ', count);
    var today = new Date();
    var minutes = ((today.getHours() * 60) + today.getMinutes()) - startMinutes;
    var seconds = today.getSeconds() - startSeconds;
    var milliseconds = today.getMilliseconds() - startMilliseconds;
    if (seconds < 0) {
      minutes -= 1;
      seconds = 60 + seconds;
    }
    if (milliseconds < 0) {
      seconds -= 1;
      milliseconds = 999 + milliseconds;
    }
    console.log('time elapsed:', minutes, 'm : ', seconds, 's : ', milliseconds, 'ms');
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
wrapper();