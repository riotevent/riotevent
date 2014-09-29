'use strict';

// Events controller
angular.module('events').controller('EventsController', ['$scope', '$stateParams', '$location', '$http', 'Authentication', 'Events', '$upload',
 function ($scope, $stateParams, $location, $http, Authentication, Events, $upload) {
        $scope.authentication = Authentication;

        //SELECT TAGS CATEGORY
        $scope.event = {};
        $scope.event.comment_cats = ['General discussion'];

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
            console.log($scope.image_upload);


        };

        $scope.today = new Date();
        $scope.today = +$scope.today;

        $scope.day_difference = function (date) {
            var date_ms = new Date(date);
            date_ms = +date_ms;
            var difference = parseInt((date_ms - $scope.today)/86400000+1);
            if(difference == 0) {
                difference = "Today";
            }
            else if(difference == 1) {
                difference = "Tomorrow";
            }
            else {
                difference = "In "+difference+" days";
            }
            return difference;
        }

        // Create new Event
        $scope.create = function () {


            // Create new Event object
            if(angular.isDefined($scope.image_upload)) {
                //Define new name for the image
                $scope.name = $scope.image_upload.name.replace(/\..+$/, '');
                $scope.name = $scope.image_upload.name.replace(name, this.event.url);

                //Upload image
                $scope.upload = $upload.upload({
                    url: '/upload',
                    method: 'POST',
                    file: $scope.image_upload,
                    fileName: $scope.name
                }).success(function (data, status, headers, config) {
                    console.log('Photo uploaded!');
                }).error(function (err) {
                    $scope.uploadInProgress = false;
                    console.error('Error uploading file: ' + err.message || err);
                });
                }
                else {
                    console.log('No file found');
                }
            var event = new Events({
                title: this.event.title,
                url: this.event.url,
                start_datetime: this.event.start_datetime,
                end_datetime: this.event.end_datetime,
                time_description: this.event.time_description,
                description: this.event.description,
                location_name: this.event.location_name,
                location_latitude: $scope.markers.marker ? $scope.markers.marker.lat : null,
                location_longitude: $scope.markers.marker ? $scope.markers.marker.lng : null,
                comment_cats: this.event.comment_cats,
                pass: this.event.pass,
                image: $scope.name
            });


            // After save
            event.$save(function (response) {
                //Redirect
                $location.path('events/' + response.url);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });

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
                $location.path('events/' + event.url);
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
