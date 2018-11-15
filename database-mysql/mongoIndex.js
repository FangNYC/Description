//handles inserts and queries

const { exec } = require('child_process');

//========================
//import:

var insertFromCSV = (filename, cb) => {
exec(`mongoimport --db listing --collection listing-collection --type csv --ignoreBlanks --file ./${filename}.csv --fields user_name,room_type,room_type_details,city,city_details,listing_details,guest_access_details,interaction_guests_details,other_details`, (err, stdout, stderr) => {
    if (err) console.log(err);
    else cb();
})
}

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
  drop()
});

module.exports.insertFromCSV = insertFromCSV;