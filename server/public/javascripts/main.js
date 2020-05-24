(function($) {
	_.templateSettings = {
		interpolate: /\{\{(.+?)\}\}/g
	};

	// card parties
	var cardPartiesView, cardPartyDetailsView;

	var CardParty = Backbone.Model.extend({
		urlRoot: '/card_parties',
		defaults: function() {
			return {
				name: '',
				players: '',
				creation_date: new Date()
			}
		}
	});

	CardParty.prototype.idAttribute = '_id';

	// collection of CardParty
	var CardPartyList = Backbone.Collection.extend({
		model: CardParty, 
		url: '/card_parties'
	});

	var cardParties = new CardPartyList();

	// View of ONE card party
	var CardPartyView = Backbone.View.extend({
		model: CardParty,
		tagName: 'div',
		events: {
			'click .edit-card-party': 'edit',
			'click .details': 'details',
			'click .delete': 'delete'
		},
		initialize: function() {
			this.template = _.template($('#card-party-template').html());
		},
		edit: function(ev) {
			ev.preventDefault();
			this.$('.name').attr('contenteditable', true).focus();
			this.$('.players').attr('contenteditable', true);
			this.$('.creation_date').attr('contenteditable', true);
		},
		details: function(ev) {
			var target = $(ev.currentTarget);
			ev.preventDefault();
			console.log('navigate to target', target);
			console.log(target.attr('href'));
      router.navigate(target.attr('href'), {trigger: true});
		},
		close: function(ev) {
			var name = this.$('.name').text();
			var players = this.$('.players').text();
			var creation_date = this.$('.creation_date').text();

			var self = this;
			this.model.save({status: status}, {
				success: function() {
					console.log('Successfully updated card_partty ' + self.model.id);
				},
				error: function() {
					console.log('Failed to update card_party with id ' + self.model.id);
				}
			})

			this.$('.name').removeAttr('contenteditable')
			this.$('.players').removeAttr('contenteditable')
			this.$('.creation_date').removeAttr('contenteditable')
		},
		onEnterUpdate: function(ev) {
			var self = this;
			console.log(ev.keyCode);
			if (ev.keyCode === 13) {
				this.close();
				_.delay(function() { self.$('.name').blur() }, 100);
				_.delay(function() { self.$('.players').blur() }, 100);
				_.delay(function() { self.$('.creation_date').blur() }, 100);
			}
		},
		delete: function(ev) {
			ev.preventDefault();
			this.model.destroy({ // delete CardPartyModel then remove model from CardPartyList collection
				success: function() { cardParties.remove(this.model)},
				error: function() { console.log('Failed to remove cardParty with id ' + this.model.id)}
			})
		},
		render: function() {
			console.log(this.model.toJSON());
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});

	// View of ALL the card parties
	var CardPartiesView = Backbone.View.extend({
		model: cardParties,
		el: $('#card-parties-container'),
		initialize: function() {
			self = this;
			this.model.on('add', this.render, this);
			this.model.on('remove', this.render, this);
			cardParties.fetch({
				success: function() {
					self.render();
				},
				error: function() {
					console.log('cannot retrieve cardParties from server');
				}
			})
		},
		render: function() {
			var self = this;
			self.$el.html('');

			this.model.each(function(cardParty, i) {	
				self.$el.append((new CardPartyView({model: cardParty})).render().$el);
			});
			return this;
		},
		hide: function(ev) {
			this.$el.hide();
		},
		show: function(model) {
			this.$el.show();
		},
	});

	// Detail view of a CardParty
	var CardPartyDetailsView = Backbone.View.extend({
		el: $('#card-party-details'),
		events: {
			'click .back': 'back'
		},
		initialize: function() {
			this.template = _.template($('#card-party-details-template').html());
		},
		back: function(ev) {
			ev.preventDefault();
			router.navigate('', { trigger: true });
		},
		hide: function(ev) {
			this.$el.hide();
		},
		show: function(model) {
			this.model = model;
			this.render();
			this.$el.show();
		},
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});



	// Tweets
	var tweetsView, tweetDetailsView;

	var Tweet = Backbone.Model.extend({
		urlRoot: '/tweets',
		defaults: function() {
			return {
				author: '',
				status: ''
			}
		}
	});

	Tweet.prototype.idAttribute = '_id';
	
	// collection
	var TweetsList = Backbone.Collection.extend({
		model: Tweet, 
		url: '/tweets'
	});
	
	var tweets = new TweetsList();

	var TweetView = Backbone.View.extend({
		model: Tweet,
		tagName: 'div',
		events: {
			'click .edit': 'edit',
			'click .details': 'details',
			'click .delete': 'delete',
			'blur .status': 'close',
			'keypress .status': 'onEnterUpdate'
		},
		initialize: function() {
			this.template = _.template($('#tweet-template').html());
		},
		edit: function(ev) {
			ev.preventDefault();
			this.$('.status').attr('contenteditable', true).focus();
		},
		details: function(ev) {
			var target = $(ev.currentTarget);
			ev.preventDefault();
			console.log('navigate to target', target);
			console.log(target.attr('href'));
      router.navigate(target.attr('href'), {trigger: true});
		},
		close: function(ev) {
			var status = this.$('.status').text();
			var self = this;
			this.model.save({status: status}, {
				success: function() {
					console.log('Successfully updated tweet ' + self.model.id);
				},
				error: function() {
					console.log('Failed to update tweet with id ' + self.model.id);
				}
			})
			this.$('.status').removeAttr('contenteditable')
		},
		onEnterUpdate: function(ev) {
			var self = this;
			console.log(ev.keyCode);
			if (ev.keyCode === 13) {
				this.close();
				_.delay(function() { self.$('.status').blur() }, 100);
			}
		},
		delete: function(ev) {
			ev.preventDefault();
			this.model.destroy({ // delete tweetModel then remove model from tweets collection
				success: function() { tweets.remove(this.model)},
				error: function() { console.log('Failed to remove tweet with id ' + this.model.id)}
			})
		},
		render: function() {
			console.log(this.model.toJSON());
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});

	var TweetsView = Backbone.View.extend({
		model: tweets,
		el: $('#tweets-container'),
		initialize: function() {
			self = this;
			this.model.on('add', this.render, this);
			this.model.on('remove', this.render, this);
			tweets.fetch({
				success: function() {
					self.render();
				},
				error: function() {
					console.log('cannot retrieve tweets from server');
				}
			})
		},
		render: function() {
			var self = this;
			self.$el.html('');

			//_.each(this.model, function(tweet, i) {
			this.model.each(function(tweet, i) {	
				self.$el.append((new TweetView({model: tweet})).render().$el);
			});
			return this;
		},
		hide: function(ev) {
			this.$el.hide();
		},
		show: function(model) {
			this.$el.show();
		},
	});

	var TweetDetailsView = Backbone.View.extend({
		el: $('#tweet-details'),
		events: {
			'click .back': 'back'
		},
		initialize: function() {
			this.template = _.template($('#tweet-details-template').html());
		},
		back: function(ev) {
			ev.preventDefault();
			router.navigate('', { trigger: true });
		},
		hide: function(ev) {
			this.$el.hide();
		},
		show: function(model) {
			this.model = model;
			this.render();
			this.$el.show();
		},
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});

	var Router = Backbone.Router.extend({
		routes: {
			'': 'index',
			'tweets/:id': 'showTweet',
			'card_party/:id': 'showCardParty'
		},
		index: function() {
			tweetDetailsView.hide();
			tweetsView.show();

			cardPartyDetailsView.hide();
			cardPartiesView.show();
		},
		showTweet: function(id) {
			model = new Tweet({ _id: id});
			model.fetch({
				success: function() {
					tweetDetailsView.show(model);
					tweetsView.hide();
				},
				error: function(error) { console.log('failed to fetch tweet'); }

			});
		},
		showCardParty: function(id) {
			model = new CardParty({ _id: id});
			model.fetch({
				success: function() {
					cardPartyDetailsView.show(model);
					cardPartiesView.hide();
				},
				error: function(error) { console.log('failed to fetch card_party'); }

			});
		}
	});

	var router = new Router();

	$(document).ready(function() {
		$('#new-tweet').submit(function(ev) {
			ev.preventDefault();
			var tweet = new Tweet({ author: $('#author-name').val(), status: $('#status-update').val()});	
			
			tweet.save({}, {
				success: function() { console.log('successfully saved tweet'); tweets.add(tweet);},
				error: function() { console.log('Error saving tweet'); }
			});

			return false;
		});

		$('#new-card-part').submit(function(ev) {
			ev.preventDefault();
			var cardParty = new CardParty({ name: $('#name').val(), players: $('#players').val(), creation_date: $('#creation_date').val()});	
			
			cardParty.save({}, {
				success: function() { console.log('successfully saved cardParty'); cardParties.add(cardParty);},
				error: function() { console.log('Error saving cardParty'); }
			});

			return false;
		});


		tweetsView = new TweetsView();
		tweetDetailsView = new TweetDetailsView();

		cardPartiesView = new CardPartiesView();
		cardPartyDetailsView = new CardPartyDetailsView();

		Backbone.history.start({});
	});
})(jQuery);