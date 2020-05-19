var Mongolian = require('mongolian');
var server = new Mongolian();
var db = server.db('backbone_tutorial');
db.collection('tweets');

module.exports.collections = {
	tweets: db.collection('tweets')
};