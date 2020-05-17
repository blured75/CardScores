(function($) {
	var Tweet = Backbone.Model.extend({
		defaults: function() {
			return {
				author: '',
				status: ''
			}
		}
	});
	
	var TweetsList = Backbone.Collection.extend({
		model: Tweet
	});
	
	var tweets = new TweetsList();

	var TweetView = Backbone.View.extend({
		model: Tweet,
		tagName: 'div',
		initialize: function() {
			this.template = _.template($('#tweet-template').html());
		},
		render: function() {
			console.log('model : ', this.model);
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});

	var TweetsView = Backbone.View.extend({
		model: tweets,
		el: $('#tweets-container'),
		initialize: function() {
			this.model.on('add', this.render, this);
		},
		render: function() {
			var self = this;
			self.$el.html('');
			console.log('in render this.model', this.model);

			_.each(this.model, function(tweet, i) {
				console.log(i);
				console.log(tweet); // Undefined ???
				console.log((new TweetView({model: tweet})).render().$el);
				self.$el.append((new TweetView({model: tweet})).render().$el);
			});
			return this;
		}
	});

	$(document).ready(function() {
		$('#new-tweet').submit(function(ev) {
			var tweet = new Tweet({ author: $('#author-name').val(), status: $('#status-update').val()});	
			console.log('adding : ', tweet.toJSON());
			tweets.add(tweet);

			return false;
		});

		var appView = new TweetsView();
	});
})(jQuery);