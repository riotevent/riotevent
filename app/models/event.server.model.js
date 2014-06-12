'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Event Schema
 */
var EventSchema = new Schema({
	title: {
		type: String,
		default: '',
		required: 'Please fill Event title',
		trim: true
	},
	description: {
		type: String,
		default: '',
		required: 'Please fill Event description',
		trim: true
	},
	url: {
		type: String,
		default: '',
		required: 'Please fill Event address',
		trim: true
	},
	time_description: {
		type: String,
		default: '',
		required: 'Please fill Event time',
		trim: true
	},
	location_name: {
		type: String,
		default: '',
		required: 'Please fill Event location',
		trim: true
	},
	location_latittude: {
		type: Number
	},
	location_longitude: {
		type: Number
	},
	start_datetime: {
		type: Date,
		default: '',
		required: 'Please fill Event starting date'
	},
	end_datetime: {
		type: Date,
		default: ''
	},
	image: { 
		type: String,
		bin: Buffer,
		required: 'Please choose Event image'
	},
	pass: {
		type: String,
		default: '',
	},
	created: {
		type: Date,
		default: Date.now
	},
	updated: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	comment_cat: {
		type: Array
	}
});

mongoose.model('Event', EventSchema);
