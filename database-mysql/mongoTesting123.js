const { exec } = require('child_process');

const MongoClient = require('mongodb').MongoClient;

const url = `mongodb://localhost:27017/listing_description`;

//exec('mongod --dbpath=/data --port 27017');

var document = {
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


var connectToListing = (onComplete, databaseName, collectionName, callback, ...args) => {
    MongoClient.connect(url, (err, db) =>  {
        if (err) {
          console.log('connection error: ',err)
        } else {
          console.log('connected to  mongo');
          let listing = db.db(databaseName);
          listing.createCollection(collectionName, (err, collection) => {
            if (err) console.log(err);
            else callback(onComplete, collection, ...args);
            // db.close();
            // console.log('connection closed');
          })
        }
    })
};

var find = (onComplete, collection, key) => {
    collection.find().toArray( (err, documents) => {
        if(err) console.log(err)
        documents.forEach( (document) => {
            //console.log(document)
            console.log(`${key}: `, document[key]);
        })
        onComplete();
    });
};

var insert = (onComplete, collection, document) => {
    collection.insert(document, (err, docs) => {
        if (err) {
            console.log('insertion errror:', err);
        } else {
          console.log('document inserted');
        }
        onComplete();
    }) 
}

var drop = (onComplete, collection) => {
  collection.drop();
}

// var promise = new Promise( (resolve) => {
//     console.log('find1')
//     var onComplete = () => {
//         resolve();
//     }
//     connectToListing(onComplete, 'listing', 'listing-collection', find, 'user_name');
// });
// promise.then( () => {
//     console.log('insert')
//     promise = new Promise( (resolve) => {
//     var onComplete = () => {
//         resolve();
//     }
//     connectToListing(onComplete, 'listing', 'listing-collection', insert, document);
//     })
// })
// promise.then( () => {
//     console.log('find2')
//     var onComplete = () => {}
//     connectToListing(onComplete, 'listing', 'listing-collection', find, 'user_name')
// })



//========================
//import:

// exec('mongoimport --db listing --collection listing-collection --type csv --file ./dummyData.csv --fields user_name,room_type,room_type_details,city,city_details,listing_details,guest_access_details,interaction_guests_details,other_details', (err, stdout, stderr) => {
//   if (err) console.log(err);
// })

//========================
//view records:

var onComplete = () => {}
connectToListing(onComplete, 'listing', 'listing-collection', find, 'user_name');

//========================
//drop table:

// var onComplete = () => { console.log('dropped') }
// connectToListing(onComplete, 'listing', 'listing-collection', drop);






// MongoClient.connect(url, (err, db) =>  {
//     if (err) {
//       console.log('connection error: ',err)
//     } else {
//       console.log('connected to  mongo');
//       let listing = db.db('listing');
//       listing.createCollection('listing-collection', (err, collection) => {
//         if (err) console.log(err);
//         else db.collection.drop();
//         // db.close();
//         // console.log('connection closed');
//       })
//     }
// })