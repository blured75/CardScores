var tweets = require('../db').collections.tweets;

exports.index = function(req, res) {
	tweets.find().toArray(function(err, docs) {
		if (err) return res.status(500).send( {status: 'Failed to find tweets'});
		res.send(docs);
	});
}

exports.show = function(req, res) {
	
}

exports.create = function(req, res) {
	var params = req.body;
	tweets.insert(params, function(err) {
		if (err) return res.status(500).send( {status: 'Failed to create new tweet'});
		res.send(params);
	})
}

exports.destroy = function(req, res) {
	
}

exports.update = function(req, res) {
	
}