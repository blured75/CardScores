var home = require('./controllers/home_controller'),
		tweets = require('./controllers/tweets_controller'),
		card_parties = require('./controllers/card_parties_controller');

module.exports = function(app) {
	app.get('/', home.index);

	app.get('/tweets', tweets.index);
	app.get('/card_parties', card_parties.index);

	// CRUD card_parties
	app.post('/card_parties', card_parties.create);
	app.get('/card_parties/:id', card_parties.show);
	app.put('/card_parties/:id', card_parties.update);
	app.delete('/card_parties/:id', card_parties.destroy);

	// CRUD Tweets
	app.post('/tweets', tweets.create);
	app.get('/tweets/:id', tweets.show);
	app.put('/tweets/:id', tweets.update);
	app.delete('/tweets/:id', tweets.destroy);
}

