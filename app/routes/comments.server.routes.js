'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var comments = require('../../app/controllers/comments');

	// Comments Routes
	app.route('/comments')
		.get(comments.list)
		.post(users.requiresLogin, comments.create);

	app.route('/comments/:commentId')
		.get(comments.read)
		.put(users.requiresLogin, comments.hasAuthorization, comments.update)
		.delete(users.requiresLogin, comments.hasAuthorization, comments.delete);

	app.route('/eventcomment/:eventId')
		.get(comments.read);

	// Finish by binding the Comment middleware
	app.param('commentId', comments.commentByID);
	app.param('eventId', comments.commentByEventID);
};
