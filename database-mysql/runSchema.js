var db = require('./index.js');

var schema = [`DROP DATABASE IF EXISTS listings;`,
`CREATE DATABASE listings;`,
`USE listings;`,
`CREATE TABLE listing_description (id INT(11) AUTO_INCREMENT NOT NULL, room_type MEDIUMTEXT, user_name MEDIUMTEXT, room_type_details MEDIUMTEXT, city MEDIUMTEXT, city_details MEDIUMTEXT, listing_details MEDIUMTEXT, guest_access_details MEDIUMTEXT, interaction_guests_details MEDIUMTEXT, other_details MEDIUMTEXT, PRIMARY KEY (id));`
];

var runSchema = (cb) => {
    db.runSchema(schema, 0, cb);
};

var useDB = (cb) => {
    db.runSchema(schema, 2, cb, 2);
}

module.exports.useDB = useDB;
module.exports.runSchema = runSchema;