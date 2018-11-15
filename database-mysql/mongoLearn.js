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


MongoClient.connect(url, (err, db) =>  {
    if (err) {
      console.log('connection error: ',err)
    } else {
      console.log('connected to  mongo');
      let listing = db.db('listing');
      listing.createCollection('listing-collection', (err, collection) => {
          if (err) {
            console.log('collection errror:', err);
          } else {
            console.log('creating collection...');
            collection.insert(document, (err, docs) => {
                if (err) {
                    console.log('insertion errror:', err);
                } else {
                console.log('document inserted');
                collection.count( (err, count) => {
                    if (err) {
                        console.log('count errror:', err);
                    } else {
                        console.log('count in collection: ', count);
                    }
                });
                collection.find().toArray( (err, documents) => {
                    documents.forEach( (document) => {
                        console.log('username: ', document.user_name)
                    })
                });
                db.close();
                console.log('connection closed');
                }
            })
          }
      })
    }
})