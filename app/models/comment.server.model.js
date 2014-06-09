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
	// Comment model fields   
	// ...
});

mongoose.model('Comment', CommentSchema);