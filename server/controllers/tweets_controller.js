var tweets = require('../db').collections.tweets,
		ObjectId = require('../db').ObjectId,
		_ = require('underscore');

exports.index = function(req, res) {
	tweets.find().toArray(function(err, docs) {
		if (err) return res.status(500).send( {status: 'Failed to find tweets'});
		res.send(docs);
	});
}

exports.show = function(req, res) {
	var id = req.params.id;

	tweets.findOne({ _id: new ObjectId(id)}, function(err, tweet) {
			if(err) return res.status(500).send({status: "Failed to find tweet due to database error " + id});
			if(!tweet) return res.status(404).send({status: "Cannot find tweet with id=" + id});

			res.send(tweet);
	});
};

exports.create = function(req, res) {
	var params = req.body;
	tweets.insert(params, function(err) {
		console.log(err);
		if (err) return res.status(500).send( {status: 'Failed to create new tweet'});
		res.send(params);
	})
}

exports.destroy = function(req, res) {
	var id = req.params.id;
	tweets.remove({ _id: new ObjectId(id)}, function(err, numRemoved) {
		if (err || numRemoved !== 1) return res.status(500).send({ status: 'Failed to delete tweet ' + id + ' from server'}); 
		res.send({ _id: id });
	});
}

exports.update = function(req, res) {
	var id = req.params.id;
	var params = req.body;

	tweets.update({_id: new ObjectId(id)}, sanitize(params), function(err, numUpdated) {
		console.log(err);
		if (err || numUpdated !== 1) return res.status(500).send({ status: 'Failed to update tweet ' + id});
		res.send(params);	
	});
}

function sanitize(tweet) {
	console.log('sanitize');
	console.log('tweet', tweet);
	var tweet = _.clone(tweet);
	delete tweet._id;

	return tweet;
}