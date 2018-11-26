const MONGO = require('./mongoIndex.js');

const insertFromCSV = (dbms, filename, cb) => {
    console.log('performing mongo query')
    MONGO.insertFromCSV(filename, cb);
}

module.exports.insertFromCSV = insertFromCSV;