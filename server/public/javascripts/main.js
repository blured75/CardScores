(function($) {
	_.templateSettings = {
		interpolate: /\{\{(.+?)\}\}/g
	};

	var Tweet = Backbone.Model.extend({
		defaults: function() {
			return {
				author: '',
				status: ''
			}
		}
	});
	
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
		close: function(ev) {
			var status = this.$('.status').text();
			this.model.set('.status', status);
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
			tweets.remove(this.model);
		},
		render: function() {
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
		}
	});

	$(document).ready(function() {
		$('#new-tweet').submit(function(ev) {
			var tweet = new Tweet({ author: $('#author-name').val(), status: $('#status-update').val()});	
			tweets.add(tweet);
			tweet.save({}, {
				success: function() { console.log('successfully saved tweet'); },
				error: function() { console.log('Error saving tweet'); }
			});

			return false;
		});

		var appView = new TweetsView();
	});
})(jQuery);