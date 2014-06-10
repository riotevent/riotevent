'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Comment Schema
 */
var CommentSchema = new Schema({
	text: {
		type: String,
		default: '',
		required: 'Comment is useful if it has text!',
		trim: true
	},
	category: {
		type: String
	},
	parent_comment: {
		type: Schema.ObjectId,
		ref: 'Comment'
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	event: {
		type: Schema.ObjectId,
		ref: 'Event'
	},
	created: {
		type: Date,
		default: Date.now
	},
	updated: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Comment', CommentSchema);