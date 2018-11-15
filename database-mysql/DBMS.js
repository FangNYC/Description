const MYSQL = require('./index.js');
const MONGO = require('./mongoIndex.js');


const insertFromCSV = (dbms, filename, cb) => {
  if (dbms === 'mysql') {
    console.log('performing mysql query')
    MYSQL.insertFromCSV(filename, cb);
  } else if (dbms === 'mongo') {
    console.log('performing mongo query')
    MONGO.insertFromCSV(filename, cb);
  }
}



  module.exports.insertFromCSV = insertFromCSV;