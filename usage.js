// sample usage
(function() {
	// create a namespaced app
	aventadorjs.createApp('ontrack');

	// create a handler
	ontrack.handler('TwitterHandler', function() {
		this.tweet = function(tweet) {
			// call a service
		};
	});

	// create a handler
	ontrack.service('TwitterService', function() {
		return {
			tweet: function () {}
		};
	});
	
});

/*====== somewhere in your DOM manipulation JS =======*/
$(function() {
	var TwitterHandler = ontrack.getHandler('TwitterHandler');

	$('.btn-tweet').on('click', function() {
		var tweetMessage = 'hello world!';

		TwitterHandler.tweet(tweetMessage, function (response) {
			if (response) {
				alert('Tweeted succefully')
			}
		});

	});
})();