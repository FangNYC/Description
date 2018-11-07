var faker = require('faker');
var db = require('./index.js');

var buildPar = (char) => {
  var par = '';
  var recurse = () => {
    if (par.length >= char) {
      return;
    } else {
      par = par + faker.lorem.sentence() + ' ';
      recurse();
    }
  };
  recurse();
  return par;
};

function Data() {
  this.name = faker.name.findName();
  this.roomType = [
    'ENTIRE APARTMENT',
    'ENTIRE LOFT',
    'PRIVATE ROOM IN TOWNHOUSE',
    'PRIVATE ROOM IN APARTMENT',
    'PRIVATE ROOM',
    'PRIVATE ROOM IN GUEST SUITE'
  ];
  this.roomType = this.roomType[Math.floor(Math.random() * this.roomType.length)];
  this.roomTypeDetails = buildPar(40);
  this.city = faker.address.city();
  this.cityDetails = buildPar(375);
  this.listingDetails = buildPar(600);
  this.guestAccessDetails = buildPar(450);
  this.interactionGuestsDetails = buildPar(300);
  this.otherDetails = buildPar(250);
};

for (var i = 1; i < 101; i++) {
  ID = i;
  var data = new Data;
  db.interstAll(ID, data.name, data.roomType, data.roomTypeDetails, data.city, data.cityDetails, data.listingDetails, data.guestAccessDetails, data.interactionGuestsDetails, data.otherDetails, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
}