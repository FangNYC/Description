// require('newrelic');

var express = require('express');
var bodyParser = require('body-parser');
var MONGO = require('../db/mongoIndex.js')
var path = require('path');
var connection;
var app = express();
app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/description', function(req, res) {
	var id = Number(req.query.id)
	MONGO.selectById(connection, id, function(err, result){
		if(err){
			console.log(err)
		}else{
			res.send(result)
		}
	})
});


app.get('/listing', function(req, res) {
		res.sendFile(path.join(__dirname, '/../react-client/dist/index.html'))
});

console.log('index hit')

app.listen(process.env.PORT || 4000, function() {
  console.log(`listening on port ${process.env.PORT || 4000}`);
  MONGO.connectToListing('listing', 'listing-collection', (data) => {
	connection = data;
	module.exports.connection = connection;
  })
});
