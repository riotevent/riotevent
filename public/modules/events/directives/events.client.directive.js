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
                if (angular.isUndefined($scope.event.title)) {
                    $scope.title = '';
                }
                if ($scope.lock_input === true) {
                    $scope.event.url = $filter('lowercase')($scope.event.title.replace(/ /g, ''));
                }
            };
            $scope.event_path = $location.$$host + '/events/';
        }
    };
});

angular.module('events').directive('mapForm', function ($http) {
    return {
        restrict: 'E',
        templateUrl: 'modules/events/views/map-form-event-directive.view.html',
        link: {
            pre: function ($scope, element, attributes) {

                angular.extend($scope, {
                    bounds: {
                        southWest: {
                            lat: -35,
                            lng: -35
                        },
                        northEast: {
                            lat: 35,
                            lng: 35
                        }
                    },
                    markers: {},
                    hostmap: {},
                    layers: {
                        baselayers: {
                            quest: {
                                name: 'OpenMapQuest',
                                type: 'xyz',
                                url: 'http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png',
                                layerOptions: {
                                    subdomains: ['1', '2', '3', '4'],
                                    attribution: 'contributors - &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                                    continuousWorld: true
                                }
                            },
                            osm: {
                                name: 'OpenStreetMap',
                                type: 'xyz',
                                url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                                layerOptions: {
                                    subdomains: ['a', 'b', 'c'],
                                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                                    continuousWorld: true
                                }
                            }
                        }
                    }
                });

                //MAP SEARCH & MARKER

                var app_email = 'remiclaude@free.fr';

                $scope.enter_searchaddress = function (event) {
                    if (event.which === 13) $scope.searchaddress();
                };



                $scope.searchaddress = function () {
                    $http
                        .get('http://nominatim.openstreetmap.org/search?q=' + $scope.event.location_name.replace(/ /g, '+') + '&format=json&limit=1&email=' + app_email)
                        .success(function (data) {
                            if (data[0] && parseFloat(data[0].importance) > 0.5) {

                                var lon = parseFloat(data[0].lon);
                                var lat = parseFloat(data[0].lat);

                                $scope.markers.marker = {
                                    lat: parseFloat(data[0].lat),
                                    lng: parseFloat(data[0].lon),
                                    focus: true,
                                    draggable: true
                                };

                                $scope.bounds.southWest.lat = parseFloat(data[0].boundingbox[0]);
                                $scope.bounds.northEast.lat = parseFloat(data[0].boundingbox[1]);
                                $scope.bounds.southWest.lng = parseFloat(data[0].boundingbox[2]);
                                $scope.bounds.northEast.lng = parseFloat(data[0].boundingbox[3]);
                            }
                        });
                };
            }
        }
    };
});
