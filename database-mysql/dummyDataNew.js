var faker = require('faker');
var db = require('./index.js');

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

// for (var i = 0, promise = Promise.resolve(); i < 100; i++) {
//   promise = promise.then(() => {
//     new Promise((resolve) => {
//         setTimeout(function () {
//             console.log(i);
//             resolve();
//         }, 1000)
//     })
//   })
// }





// for (let i = 0, promise = Promise.resolve(); i < 10000000; i++) {
//   promise = promise.then(() => (
//     new Promise(
      
//       function (resolve) {
//         ID = i+1;
// var data = new Data;
// db.interstAll(ID, data.name, data.roomType, data.roomTypeDetails, data.city, data.cityDetails, data.listingDetails, data.guestAccessDetails, data.interactionGuestsDetails, data.otherDetails, function (err, result) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// });
//         resolve();
//         }

//   )));
// }





// (async function loop() {
//   for (let i = 0; i < 10; i++) {
//       await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
//       console.log(i);
//   }
// })();

// ID = i+1;
// var data = new Data;
// db.interstAll(ID, data.name, data.roomType, data.roomTypeDetails, data.city, data.cityDetails, data.listingDetails, data.guestAccessDetails, data.interactionGuestsDetails, data.otherDetails, function (err, result) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// });












    // setTimeout(() => {
    // for (var i = 0; i < batchSize; i++) {
    //   //console.log(i)
    //   count += 1;

    //   ID = count;
    //   var data = new Data;
    //   db.interstAll(ID, data.name, data.roomType, data.roomTypeDetails, data.city, data.cityDetails, data.listingDetails, data.guestAccessDetails, data.interactionGuestsDetails, data.otherDetails, function (err, result) {
    //     if (err) {
    //       console.log(err);
    //     } else {
    //       console.log('added: ', count)
    //       //console.log(result);
    //     }
    //   });
    // }
    // }, 





  // var delayInsert = (total) => {
  //   var count = 0;
  //   var recurse = () => {
  //     if (total === count) {
  //       return;
  //     } else {
  //       ID = count;
  //       var data = new Data;
  //       db.interstAll(ID, data.name, data.roomType, data.roomTypeDetails, data.city, data.cityDetails, data.listingDetails, data.guestAccessDetails, data.interactionGuestsDetails, data.otherDetails, function (err, result) {
  //         if (err) {
  //           console.log(err);
  //         } else {
  //           console.log('added: ', count)
  //           //console.log(result);
  //         }
  //       });
  //       count++;
  //       setTimeout(recurse(), 0.1)
  //     }
  //   }
  //   recurse();
  // }

  // delayInsert(10000000);



















// var count = 0;
// var totalSize = 10000000;
// var batchSize = 10000;
// var wrapper = () => {
//   if(count >= totalSize) {
//     console.log('count complete: ', count);
//     return;
//   }
//   var promise = new Promise(
//     function(resolve) {
//     setTimeout(() => {
//     for (var i = 0; i < batchSize; i++) {
//       //console.log(i)
//       count += 1;

//       ID = count;
//       var data = new Data;
//       db.interstAll(ID, data.name, data.roomType, data.roomTypeDetails, data.city, data.cityDetails, data.listingDetails, data.guestAccessDetails, data.interactionGuestsDetails, data.otherDetails, function (err, result) {
//         if (err) {
//           console.log(err);
//         } else {
//           //console.log('added: ', count)
//           const used = process.memoryUsage().heapUsed / 1024 / 1024;
//         console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
//           //console.log(result);
//         }
//       });



//       if (i === batchSize-1) {
//         // console.log('count step: ', count);
//         // console.log('...now get the next batch')
//         resolve();
//       }
//     }
//     }, 5000)
//   });

//   promise.then(function() {
//     wrapper();
//   });
// }

// wrapper();







// var count = 0;
// var loop = (cb, min, current) => {
//   setTimeout(() => {
//     cb();
//     if (current() < min) {
//       // console.log('min: ', min)
//       // console.log('current: ', current())
//       loop(cb, min, current);
//     }
//   }, 1000)
// }

// // loop(() => {
// //   count += 1;
// //   console.log('repeat: ', count)
// // }, 6, () => { return count; });




// var count = 0;
// var totalSize = 10000000;
// var batchSize = 10000;
// var wrapper = () => {
//   if(count >= totalSize) {
//     console.log('count complete: ', count);
//     return;
//   }
//   var promise = new Promise(
//     function(resolve) {
//     setTimeout(() => {

//       count += 1;

//       ID = count;
//       var data = new Data;
//       db.interstAll(ID, data.name, data.roomType, data.roomTypeDetails, data.city, data.cityDetails, data.listingDetails, data.guestAccessDetails, data.interactionGuestsDetails, data.otherDetails, function (err, result) {
//         if (err) {
//           console.log(err);
//         } else {
//           //console.log('added: ', count)
//           const used = process.memoryUsage().heapUsed / 1024 / 1024;
//           console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);

//           if ((Math.round(used * 100) / 100) > 750) {
//             console.log('exceeded max memory: ', (Math.round(used * 100) / 100));
//             loop(() => {
//               console.log('...waiting to clear memory, current: ', (Math.round(used * 100) / 100));
//               // if ((Math.round(used * 100) / 100) < 250) {
//               //   //resolve();
//               // };
//             }, 250, () => {
//               return used;
//             })
//           }
//           resolve();
//         }
//       });

//     }, 0)
//   });

//   promise.then(function() {
//     wrapper();
//   });
// }

// wrapper();






// var count = 0;
// var totalSize = 10000000;
// var batchSize = 10000;
// var wrapper = () => {
//   if(count >= totalSize) {
//     console.log('count complete: ', count);
//     return;
//   }
//   var promise = new Promise(
//     function(resolve) {
//     setTimeout(() => {
//     for (var i = 0; i < batchSize; i++) {
//       //console.log(i)
//       count += 1;

//       ID = count;
//       var data = new Data;
//       db.interstAll(ID, data.name, data.roomType, data.roomTypeDetails, data.city, data.cityDetails, data.listingDetails, data.guestAccessDetails, data.interactionGuestsDetails, data.otherDetails, function (err, result) {
//         if (err) {
//           console.log(err);
//         } else {
//           //console.log('added: ', count)
//           const used = process.memoryUsage().heapUsed / 1024 / 1024;
//         console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
//           //console.log(result);
//           if (i === batchSize-1) {
//             console.log('count step: ', count);
//             console.log('...now get the next batch')
//             resolve();
//           }
//         }
//       });

//     }
//     }, 0)
//   });

//   promise.then(function() {
//     wrapper();
//   });
// }

// wrapper();



var today = new Date();
var startMinutes = ((today.getHours() * 60) + today.getMinutes());
var startSeconds = today.getSeconds();


var count = 0;
var totalSize = 100000;
var batchSize = 10000;
var wrapper = () => {
  if(count >= totalSize) {
    console.log('count complete: ', count);
    return;
  }
  var promise = new Promise(
    function(resolve) {
    //setTimeout(() => {
      count += 1;
      ID = count;
      var data = new Data;
      db.interstAll(ID, data.name, data.roomType, data.roomTypeDetails, data.city, data.cityDetails, data.listingDetails, data.guestAccessDetails, data.interactionGuestsDetails, data.otherDetails, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          // console.log('added: ', count)
          // const used = process.memoryUsage().heapUsed / 1024 / 1024;
          // console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
          // if (count === 100 || count === 1000 || count % 10000 === 0 || count === 100000 || count === 1000000) {
          //   const used = process.memoryUsage().heapUsed / 1024 / 1024;
          //   console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
          //   console.log('count: ', count);
          // }
          if (count === 100000) {
            console.log ('reached: ', count);
            var today = new Date();

            var minutes = ((today.getHours() * 60) + today.getMinutes()) - startMinutes;
            var seconds = today.getSeconds() - startSeconds;

            console.log('time elapsed:', minutes, 'm : ', seconds, 's');

          }
          resolve();
        }
      });

    //}, 0)
  });

  promise.then(function() {
    wrapper();
  });
}

wrapper();