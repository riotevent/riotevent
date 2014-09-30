'use strict';

// Events controller
angular.module('events').controller('EventsController', ['$scope', '$stateParams', '$location', '$http', 'Authentication', 'Events', 'EventCreate', '$upload',
 function ($scope, $stateParams, $location, $http, Authentication, Events, EventCreate, $upload) {
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
            if(difference === 0) {
                difference = 'Today';
            }
            else if(difference === 1) {
                difference = 'Tomorrow';
            }
            else {
                difference = 'In ' + difference + ' days';
            }
            return difference;
        };

        // Create new Event
        $scope.create = function () {
            var eventCreation = function() {
                var event = new EventCreate({
                    title: $scope.event.title,
                    url: $scope.event.url,
                    start_datetime: $scope.event.start_datetime,
                    end_datetime: $scope.event.end_datetime,
                    time_description: $scope.event.time_description,
                    description: $scope.event.description,
                    location_name: $scope.event.location_name,
                    location_latitude: $scope.markers.marker ? $scope.markers.marker.lat : null,
                    location_longitude: $scope.markers.marker ? $scope.markers.marker.lng : null,
                    comment_cats: $scope.event.comment_cats,
                    pass: $scope.event.pass,
                    image: $scope.event.image
                });
                // After save
                event.$save(function (response) {
                    //Redirect
                    $location.path('events/' + response.url);
                }, function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
            }



            // Create new Event object
            if(angular.isDefined($scope.image_upload)) {
                //Define new name for the image
                $scope.event.image = $scope.image_upload.name.replace(/\..+$/, '');
                $scope.event.image = $scope.image_upload.name.replace($scope.event.image, $scope.event.url);

                //Upload image
                $scope.upload = $upload.upload({
                    url: '/upload',
                    method: 'POST',
                    file: $scope.image_upload,
                    fileName: $scope.event.image
                }).success(function (data, status, headers, config) {
                    console.log('Photo uploaded!');
                    $scope.event.image = data.files[0].name;
                    eventCreation();
                }).error(function (err) {
                    $scope.uploadInProgress = false;
                    console.error('Error uploading file: ' + err.message || err);
                });
            }
            else {
                console.log('No file found');
                eventCreation();
            }





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
            var updateEvent = function () {
                event.$update(function () {
                    $location.path('events/' + event.url);
                }, function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
            }


            var event = $scope.event;
            if(angular.isDefined($scope.image_upload)) {
                //Define new name for the image
                $scope.event.image = $scope.image_upload.name.replace(/\..+$/, '');
                $scope.event.image = $scope.image_upload.name.replace($scope.event.image, $scope.event.url);

                //Upload image
                $scope.upload = $upload.upload({
                    url: '/upload',
                    method: 'POST',
                    file: $scope.image_upload,
                    fileName: $scope.event.image
                }).success(function (data, status, headers, config) {
                    console.log('Image uploaded!');
                    console.log(data.files[0].name);

                    $scope.event.image = data.files[0].name;

                    updateEvent();

                }).error(function (err) {
                    $scope.uploadInProgress = false;
                    console.error('Error uploading file: ' + err.message || err);
                });
            }
            else {
                console.log('No file found');
                updateEvent();
            }

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
            console.log($scope.event);
        };
 }
]);
