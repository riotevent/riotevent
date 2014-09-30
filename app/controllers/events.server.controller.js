'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Event = mongoose.model('Event'),
    _ = require('lodash');
var fs = require('fs');

/**
 * Get the error message from error object
 */
var getErrorMessage = function (err) {
    var message = '';

    if (err.code) {
        switch (err.code) {
        case 11000:
        case 11001:
            message = 'Event already exists';
            break;
        default:
            message = 'Something went wrong';
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].message;
        }
    }

    return message;
};

/**
 * Create a Event
 */
exports.create = function (req, res) {
    var event = new Event(req.body);
    event.user = req.user;

    event.save(function (err) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(event);
        }
    });
};

/**
 * Upload image for the event
 */
var options = {
    tmpDir:  __dirname + '/../../public/uploaded/tmp',
    uploadDir: __dirname + '/../..//public/uploaded/files',
    uploadUrl: '/uploaded/files/',
    minFileSize:  1,
    maxFileSize:  10000000, //10MB
    storage: {
        type: 'local'
    }
};
var uploader = require('blueimp-file-upload-expressjs')(options);

exports.upload = function (req, res) {
    console.log('Uploading image ...');

    uploader.post(req, res, function (obj) {
        console.log(obj);
        res.send(JSON.stringify(obj));
    });
};

/**
 * Show the current Event
 */
exports.read = function (req, res) {
    res.jsonp(req.event);
};

/**
 * Update a Event
 */
exports.update = function (req, res) {
    var event = req.event;

    event = _.extend(event, req.body);

    event.save(function (err) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(event);
        }
    });
};

/**
 * Delete an Event
 */
exports.delete = function (req, res) {
    var event = req.event;

    event.remove(function (err) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(event);
        }
    });
};

/**
 * List of Events
 */
exports.list = function (req, res) {
    Event.find().sort('-created').populate('user', 'displayName').exec(function (err, events) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(events);
        }
    });
};

/**
 * Event middleware
 */
exports.eventByURL = function (req, res, next, url) {
    Event.findOne({
        url: url
    }).populate('user', 'displayName').exec(function (err, event) {
        if (err) return next(err);
        if (!event) return next(new Error('Failed to load Event ' + url));
        req.event = event;
        next();
    });
};

/**
 * Event authorization middleware
 */
exports.hasAuthorization = function (req, res, next) {
    if (req.event.user.id !== req.user.id) {
        return res.send(403, 'User is not authorized');
    }
    next();
};
