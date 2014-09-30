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
		trim: true
	},
	url: {
		type: String,
		default: '',
		trim: true
	},
	time_description: {
		type: String,
		default: '',
		trim: true
	},
	location_name: {
		type: String,
		default: '',
		trim: true
	},
	location_latitude: {
		type: Number
	},
	location_longitude: {
		type: Number
	},
    map_bounding_box: {
        type: Array
    },
	start_datetime: {
		type: Date,
		default: '',
	},
	end_datetime: {
		type: Date,
		default: ''
	},
	image: { 
		type: String,
		bin: Buffer,
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
	comment_cats: {
		type: Array
	}
});

mongoose.model('Event', EventSchema);
