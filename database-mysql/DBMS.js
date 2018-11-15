const MYSQL = require('./index.js');


const insertFromCSV = (dbms, filename, cb) => {
  if (dbms === 'mysql') {
    console.log('performing mysql query')
    MYSQL.insertFromCSV(dbms, filename, cb);
  } else if (dbms === 'mongo') {
    console.log('performing mongo query')
  }
}



  module.exports.insertFromCSV = insertFromCSV;