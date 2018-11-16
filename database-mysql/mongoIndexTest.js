const { exec } = require('child_process');
// exec('mongod --dbpath=/data --port 27017');

const MongoClient = require('mongodb').MongoClient;
const url = `mongodb://localhost:27017/listing_description`;





var example = {
    user_name : 'test',
    room_type : 'test',
    room_type_details : 'test',
    city : 'test',
    city_details : 'test',
    listing_details : 'test',
    guest_access_details : 'test',
    interaction_guests_details : 'test',
    other_details : 'test'
}



//========================
//establish connection:
var connectToListing = (databaseName, collectionName, callback) => {
    MongoClient.connect(url, (err, db) =>  {
        console.log('!!!!!!!!!!!!!!!!')
        if (err) {
          console.log('connection error: ',err)
        } else {
          console.log('connected to  mongo');
          let listing = db.db(databaseName);
          listing.createCollection(collectionName, (err, collection) => {
            console.log('we made it')
            if (err) console.log(err);
            else callback({collection, db});
            // db.close();
            // console.log('connection closed');
          })
        }
    })
};
var connection;

var find = (key, callback) => {
    connection.collection.find().toArray( (err, documents) => {
        if(err) console.log(err)
        var once = false;
        documents.forEach( (document) => {
            if (once === false) {
                once = true;
                console.log(document);
            }
            // console.log(`${key}: `, document[key]);
        })
        console.log('find query was performed')
        if (callback) callback();
    });
};

var insert = (document, callback) => {
    connection.collection.insert(document, (err, docs) => {
        if (err) {
            console.log('insertion errror:', err);
        } else {
          console.log('document inserted');
        }
        if (callback) callback();
    }) 
}


//drop a collection:
var drop = (callback) => {
  console.log('being dropped')
  connection.collection.drop();
  if (callback) callback();
}

var promise = new Promise( (resolve) => {
    connectToListing('listing', 'listing-collection', (data) => {
        connection = data;
        resolve();
    })
});
promise.then( () => {
  find();
});

// var test, test2, test3, test4, test5
// var promise = new Promise( (resolve) => {
//     connectToListing('listing', 'listing-collection', (data) => {
//         connection = data;
//         resolve();
//     })
// });
// promise.then( () => {
//   test = new Promise( (resolve) => {
//       find('user_name', () => {
//           resolve();
//       });
//   });
// });
// test.then( () => {
//   test2 = new Promise( (resolve) => {
//       insert(example, () => {
//         resolve();
//     });
//   });
// });
// test2.then( () => {
//   test3 = new Promise( (resolve) => {
//       find('user_name', () => {
//         resolve();
//     });
//   });
// });
// test3.then( () => {
//   test4 = new Promise( (resolve) => {
//       drop(() => {
//         resolve();
//     });
//   });
// });
// test4.then( () => {
//   test5 = new Promise( (resolve) => {
//       find('user_name', () => {
//         resolve();
//     });
//   });
// });


// //========================
// //drop a collection:
// var drop = (onComplete, collection) => {
//   collection.drop();
// }









// //========================
// //import:

// exec('mongoimport --db listing --collection listing-collection --type csv --file ./dummyData.csv --fields user_name,room_type,room_type_details,city,city_details,listing_details,guest_access_details,interaction_guests_details,other_details', (err, stdout, stderr) => {
//     if (err) console.log(err);
//   })
  
//   //========================
//   //view records:
  
//   // var onComplete = () => {}
//   // connectToListing(onComplete, 'listing', 'listing-collection', find, 'user_name');
  
//   //========================
//   //drop table:
  
//   // var onComplete = () => { console.log('dropped') }
//   // connectToListing(onComplete, 'listing', 'listing-collection', drop);