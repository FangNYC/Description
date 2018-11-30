//handles inserts and queries
const { exec } = require('child_process');
const MongoClient = require('mongodb').MongoClient;
// const url = `mongodb://localhost:27017/listing_description`;
const url = `mongodb://174.138.58.95/listing_description`;
//========================
//import:

var insertFromCSV = (filename, cb) => {
exec(`mongoimport --db listing --collection listing-collection --type csv --ignoreBlanks --file ./${filename}.csv --fields _id,user_name,room_type,room_type_details,city,city_details,listing_details,guest_access_details,interaction_guests_details,other_details`, (err, stdout, stderr) => {
    if (err) console.log(err);
    else cb();
})
}

var connectToListing = (databaseName, collectionName, callback) => {
    console.log('connect to listing invoked')
    MongoClient.connect(url, (err, db) =>  {
        if (err) {
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
            console.log()
          console.log('connection error: ',err)
        } else {
          console.log('connected to  mongo');
          let listing = db.db(databaseName);
          listing.createCollection(collectionName, (err, collection) => {
            if (err) console.log(err);
            else callback({collection, db});
          })
        }
    })
};


var drop = (callback) => {
    var promise = new Promise( (resolve) => {
        connectToListing('listing', 'listing-collection', (data) => {
            connection = data;
            resolve();
        })
    });
    promise.then( () => {
        connection.collection.drop();
        if (callback) callback();
    });
}

var closeConnection = () => {
    connection.db.close();
    //console.log('connection closed');
}



var selectById = (connection, id, callback) => {
    //console.log(connection)
    connection.collection.findOne( {_id: id}, (err, result) => {
        if (callback) callback(err, result);
    });
}


module.exports.connectToListing = connectToListing;
module.exports.selectById = selectById;
module.exports.closeConnection = closeConnection;
module.exports.drop = drop;
module.exports.insertFromCSV = insertFromCSV;