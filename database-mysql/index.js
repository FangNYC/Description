const mysql = require('mysql');
var mysqlConfig = require('../config.js');
const DBMS = require('./DBMS.js');

var password = require('../config.js').amazonPassword;

const connection = mysql.createConnection(mysqlConfig);

var runSchema = (schema, i, cb, j) => {
  if (i === schema.length) {
    connection.end();
    cb();
    return;
  };
  var promise = new Promise(
    function(resolve) {
      connection.query(schema[i], (err, results) =>  {
        if (err) console.log(err);
        else (resolve());
        //console.log(results);
      });
  });
  promise.then(function() {
    var message = {
      0: 'Dropped Database Listings',
      1: 'Created Database Listings',
      2: 'Used Database Listings',
      3: 'Created Table Listing Description With Fields'
    };
    console.log('Step ', i+1, ': ', message[i]);
    if(i !== j) runSchema(schema, i+1, cb);
  });
};

var reconnect = () => {connection.connect();};

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
  // var sql = 'INSERT INTO listing_description (user_name, room_type, room_type_details, city, city_details, listing_details, guest_access_details, interaction_guests_details, other_details) VALUES';
  // for (var i = 0; i < args.length; i++) {
  //   sql = sql + `(`
  //   for (var j = 0; j < args[i].length; j++) {
  //     sql = sql + `${args[i][j]}`;
  //     if (j !== args[i].length - 1) {
  //       sql = sql + `, `;
  //     }
  //   }
  //   sql = sql + `)`;
  //   if (i !== args.length -1){
  //     sql =sql + `, `
  //   }
  // }
  // // console.log(sql);
  // connection.query(sql, (err, results) => {
  //   if (err) console.log(err);
  //   else callback();
  //   // else console.log(results);
  // });
  callback();
}

var insertFromCSV = (filename, cb) => {
  var loadData = () =>{
    var sql =`LOAD DATA LOCAL INFILE  './${filename}.csv'
    INTO TABLE listing_description
    FIELDS TERMINATED BY ',' 
    LINES TERMINATED BY '\n';`
    connection.query(sql, (err) => {
      // console.log('data loaded');
      if (err) console.log(err);
      else cb();
      connection.end();
    })
  }
  if (filename !== 'dummyData') {
    var sql = `CREATE TABLE ${filename} (id INT(11) AUTO_INCREMENT NOT NULL, room_type MEDIUMTEXT, user_name MEDIUMTEXT, room_type_details MEDIUMTEXT, city MEDIUMTEXT, city_details MEDIUMTEXT, listing_details MEDIUMTEXT, guest_access_details MEDIUMTEXT, interaction_guests_details MEDIUMTEXT, other_details MEDIUMTEXT, PRIMARY KEY (id));`
    connection.query(sql, (err) => {
      console.log(filename, ' table added');
      if (err) console.log(err);
      else loadData();
    })
  } else {
    loadData();
  }
}

module.exports.insertFromCSV = insertFromCSV;
module.exports.reconnect = reconnect;
module.exports.runSchema = runSchema;
module.exports.insertAny = insertAny;
module.exports.selectAll = selectAll;
module.exports.interstAll = interstAll;
// module.exports.connection = connection;