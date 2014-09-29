'use strict';

//Events service used to communicate Events REST endpoints
angular.module('events').factory('Events', ['$resource',
	function($resource) {
		return $resource('events/:url', {
            url: '@url'
        }, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

angular.module('events').factory('EventCreate', ['$resource',
	function($resource) {
		return $resource('events/');
	}
]);
