var faker = require('faker');

var today = new Date();
var startMinutes = ((today.getHours() * 60) + today.getMinutes());
var startSeconds = today.getSeconds();
var startMilliseconds = today.getMilliseconds();




var city = faker.address.city();

// console.log(city)



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
