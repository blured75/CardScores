var card_parties = require('../db').collections.card_parties,
		ObjectId = require('../db').ObjectId,
		_ = require('underscore');

exports.index = function(req, res) {
	card_parties.find().toArray(function(err, docs) {
		if (err) return res.status(500).send( {status: 'Failed to find card_parties'});
		res.send(docs);
	});
}

exports.show = function(req, res) {
	var id = req.params.id;

	card_parties.findOne({ _id: new ObjectId(id)}, function(err, card_party) {
			if(err) return res.status(500).send({status: "Failed to find card_parties due to database error " + id});
			if(!card_party) return res.status(404).send({status: "Cannot find card_parties with id=" + id});

			res.send(card_party);
	});
};

exports.create = function(req, res) {
	var params = req.body;
	card_parties.insert(params, function(err) {
		console.log(err);
		if (err) return res.status(500).send( {status: 'Failed to create new card_party'});
		res.send(params);
	})
}

exports.destroy = function(req, res) {
	var id = req.params.id;
	card_parties.remove({ _id: new ObjectId(id)}, function(err, numRemoved) {
		if (err || numRemoved !== 1) return res.status(500).send({ status: 'Failed to delete card_party ' + id + ' from server'}); 
		res.send({ _id: id });
	});
}

exports.update = function(req, res) {
	var id = req.params.id;
	var params = req.body;

	card_parties.update({_id: new ObjectId(id)}, sanitize(params), function(err, numUpdated) {
		console.log(err);
		if (err || numUpdated !== 1) return res.status(500).send({ status: 'Failed to update card_party ' + id});
		res.send(params);	
	});
}

function sanitize(card_party) {
	var card_party = _.clone(card_party);
	delete card_party._id;

	return card_party;
}