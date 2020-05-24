var Mongolian = require('mongolian'),
		ObjectId = Mongolian.ObjectId;
		
ObjectId.prototype.toJSON = function toJSON() {return this.toString()};

var server = new Mongolian();
var db = server.db('backbone_tutorial');

module.exports.collections = {
	tweets: db.collection('tweets'),
	card_parties: db.collection('card_parties')
};

module.exports.ObjectId = ObjectId;