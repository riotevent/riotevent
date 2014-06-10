'use strict';

angular.module('events').directive('eventDatepicker', function () {
	return {
		restrict: 'E',
		templateUrl: 'modules/events/views/datepicker-directive-view.html',
		link: function ($scope, element, attributes) {
			$scope.today = function () {
				$scope.date_input = new Date();
			};
			$scope.clear = function () {
				$scope.date_input = null;
			};

			$scope.open_start = function ($event) {
				$event.preventDefault();
				$event.stopPropagation();

				$scope.start_opened = true;
				$scope.end_opened = false;
			};

			$scope.open_end = function ($event) {
				$event.preventDefault();
				$event.stopPropagation();

				$scope.end_opened = true;
				$scope.start_opened = false;
			};

			$scope.format = 'dd/MM/yyyy';
		}
	};
});

angular.module('events').directive('eventTitleUrl', function ($filter, $location) {
	return {
		restrict: 'E',
		templateUrl: 'modules/events/views/title-url-directive-view.html',
		link: function ($scope, element, attributes) {
			$scope.lock_input = true;
			$scope.title = '';
			$scope.fill_address = function () {
				if(angular.isUndefined($scope.title)) { $scope.title = ''; }
				if ($scope.lock_input === true) {
					$scope.url= $filter('lowercase')($scope.title.replace(/ /g, ''));
				}
			};
			$scope.event_path = $location.$$host + '/events/';
		}
	};
});
