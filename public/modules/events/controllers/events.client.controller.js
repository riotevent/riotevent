'use strict';

// Events controller
angular.module('events').controller('EventsController', ['$scope', '$stateParams', '$location', '$http', 'Authentication', 'Events', '$upload',
 function ($scope, $stateParams, $location, $http, Authentication, Events, $upload) {
        $scope.authentication = Authentication;

        //SELECT TAGS CATEGORY
        $scope.comment_cat = ['General discussion'];
        $scope.select2Options = {
            'multiple': true,
            'simple_tags': true,
            'tags': ['General discussion', 'Ride sharing', 'Hospitality'] // Can be empty list.
        };


        $scope.onFileSelect = function (image) {
            $scope.uploadInProgress = true;

            if (angular.isArray(image)) {
                image = image[0];
            }

            $scope.image_upload = image;


        };

        // Create new Event
        $scope.create = function () {

            $scope.upload = $upload.upload({
                url: '/upload',
                method: 'POST',
                data: {
                    url: $scope.url
                },
                file: $scope.image_upload
            }).success(function (data, status, headers, config) {
                console.success('Photo uploaded!');
            }).error(function (err) {
                $scope.uploadInProgress = false;
                console.error('Error uploading file: ' + err.message || err);
            });

            // Create new Event object
            var event = new Events({
                title: this.title,
                url: this.url,
                start_datetime: this.start_datetime,
                end_datetime: this.end_datetime,
                time_description: this.time_description,
                description: this.description,
                location_name: this.location_name,
                location_latitude: $scope.markers.marker ? $scope.markers.marker.lat : null,
                location_longitude: $scope.markers.marker ? $scope.markers.marker.lng : null,
                pass: this.pass
            });


            // Redirect after save
            event.$save(function (response) {
                $location.path('events/' + response.url);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });

            // Clear form fields
            this.name = '';
        };

        // Remove existing Event
        $scope.remove = function (event) {
            if (event) {
                event.$remove();

                for (var i in $scope.events) {
                    if ($scope.events[i] === event) {
                        $scope.events.splice(i, 1);
                    }
                }
            } else {
                $scope.event.$remove(function () {
                    $location.path('events');
                });
            }
        };

        // Update existing Event
        $scope.update = function () {
            var event = $scope.event;

            event.$update(function () {
                $location.path('events/' + event._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Events
        $scope.find = function () {
            $scope.events = Events.query();
        };

        // Find existing Event
        $scope.findOne = function () {
            $scope.event = Events.get({
                url: $stateParams.url
            });
        };
 }
]);
