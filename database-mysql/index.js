const mysql = require('mysql');
var mysqlConfig = require('../config.js');

var password = require('../config.js').amazonPassword;

const connection = mysql.createConnection(mysqlConfig);
// var connection = mysql.createConnection({
//   host: 'listings.cgs4awlnkox5.us-east-2.rds.amazonaws.com',
//   user: 'dhpatel15',
//   password: password,
//   database: 'listings',
//   port: 3306
// });

var selectAll = function (id, callback) {
  var sql = 'SELECT * FROM listing_description WHERE unique_ID=(?)'
  connection.query(sql, [id], function (err, results) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var interstAll = function (randname, randroomType, randroom_type_details, randcity, randcity_details, randlisting_details, randguest_access_details, randinteraction_guests_details, randother_details, callback) {
  var sql = 'INSERT INTO listing_description (user_name, room_type, room_type_details, city, city_details, listing_details, guest_access_details, interaction_guests_details, other_details) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
  connection.query(sql, [randname, randroomType, randroom_type_details, randcity, randcity_details, randlisting_details, randguest_access_details, randinteraction_guests_details, randother_details], function (err, results) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var insertAny = (numOfRows, callback, ...args) => {
  var sql = 'INSERT INTO listing_description (user_name, room_type, room_type_details, city, city_details, listing_details, guest_access_details, interaction_guests_details, other_details) VALUES';
  for (var i = 0; i < args.length; i++) {
    sql = sql + `(`
    for (var j = 0; j < args[i].length; j++) {
      sql = sql + `${args[i][j]}`;
      if (j !== args[i].length - 1) {
        sql = sql + `, `;
      }
    }
    sql = sql + `)`;
    if (i !== args.length -1){
      sql =sql + `, `
    }
  }
  // console.log(sql);
  connection.query(sql, (err, results) => {
    if (err) console.log(err);
    else callback();
    // else console.log(results);
  });
}

module.exports.insertAny = insertAny;
module.exports.selectAll = selectAll;
module.exports.interstAll = interstAll;
// module.exports.connection = connection;