//server.js

/**
* invoke all the packages
*/
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

/**
* invoke the mongoose
*/
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bearapi');

/**
* get bodyParser to process POST
*/
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var Bear = require('./models/Bear')

var port = process.env.PORT || 8080;

/**
* Define the routes
*/
var router = express.Router();
router.use(function(req, res, next) {
	console.log('Something is happening here');
	next();
});

router.get('/', function(req, res) {
	res.json({message: 'welcome to our api'});
});

/**
* GET and POST routes
*/
router.route('/bears')
	.post(function(req, res) {
		var bear = new Bear();
		bear.name = req.body.name;
		bear.price = req.body.price;
		bear.save(function(err){
			if (err)
				res.send(err);
			res.json({message: 'Bear created'});
		});
	})
	.get(function(req, res) {
		Bear.find(function(err, bears) {
			if (err)
				res.send(err);
			res.json(bears);
		});
	});

/**
* route to get one item, edit and delete
*/
router.route('/bear/:bear_id')
	.get(function(req, res) {
		Bear.findById(req.params.bear_id, function(err, bear) {
			if (err)
				res.send(err);
			res.json(bear);
		});
	})
	.put(function(req, res) {
		Bear.findById(req.params.bear_id, function(err, bear) {
			if (err) {
				res.send(err);
			}
			
			bear.name = req.body.name;
			bear.price = req.body.price;
			bear.save(function (err) {
				if (err) 
					res.send(err);
				res.json({message: 'Bear updated'});
			});
		});
	})
	.delete(function(req, res) {
		Bear.remove({
			_id: req.params.bear_id
		}, function(err, bear) {
			if (err)
				res.send(err);
			res.json({message: 'Deleted successfully'});
		});
	});

/**
* Register routers
*/
app.use('/api', router);

/**
* Start the server
*/
app.listen(port);
console.log('Magic happens on port ' + port);