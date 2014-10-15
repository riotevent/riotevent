'use strict';

// Events controllerg
angular.module('events').controller('EventsController', ['$scope', '$stateParams', '$location', '$http', '$window', '$q', 'Authentication', 'Events', 'EventCreate', 'Comments', 'Comment', '$upload', '$document',
 function ($scope, $stateParams, $location, $http, $window, $q, Authentication, Events, EventCreate, Comments, Comment, $upload, $document) {
        $scope.authentication = Authentication;

        $window.scrollTo(0, 0);

        $scope.scrollToComment = function (id) {
            var element = document.getElementById(id);
            if(element != null) {
                var position = 0;
                while(element) {
                    position += (element.offsetTop - element.scrollTop + element.clientTop);
                    element = element.offsetParent;
                }
                console.log(position);
                $window.scrollTo(0, position-15);
            }
            else {
                console.error("Comment '" + id + "' does not exist");
            }
        }

        //SELECT TAGS CATEGORY
        $scope.event = {};
        $scope.event.comment_cats = ['General discussion'];

        $scope.loadTags = function(query) {
            var deferred = $q.defer();
            var tags = $scope.eventstags;
            var matchingTags = tags.filter(function(item) {
                return item.text.toLowerCase().indexOf(query.toLowerCase()) != -1;
            });
            deferred.resolve(matchingTags);
            return deferred.promise;
        }

        $scope.loadCats = function(query) {
            console.log(query.toLowerCase());
            var deferred = $q.defer();
            var tags = [
                { text: 'General discussion' },
                { text: 'Ride sharing' },
                { text: 'Hospitality' }
            ];
            var matchingTags = tags.filter(function(item) {
                return item.text.toLowerCase().indexOf(query.toLowerCase()) != -1;
            });
            deferred.resolve(matchingTags);
            return deferred.promise;
        }

        $scope.onFileSelect = function (image) {
            $scope.uploadInProgress = true;

            if (angular.isArray(image)) {
                image = image[0];
            }

            $scope.image_upload = image;
            console.log($scope.image_upload);


        };

        $scope.today = new Date();
        $scope.today = +$scope.today

        $scope.comment_panel_cat_nb = function (cat) {
            for(var i = 0; i < $scope.event.comment_cats.length && $scope.event.comment_cats[i].text != cat; i++){}
            return i;
        };

        $scope.comment_cats_class_show = function(id) {
            if($scope.event.comment_cats_disable[id].show == true)
                return "comment-cat-disable";
            else
                return "";
        };

        $scope.comment_cats_class_new = function(id) {
            if($scope.event.comment_cats_disable[id].new == true)
                return "comment-cat-disable";
            else
                return "";
        };
        $scope.comment_cats_disable_new = function(id) {
            angular.forEach($scope.event.comment_cats_disable, function (val, key) {
                if(key !== id) $scope.event.comment_cats_disable[key].new = true;
                else $scope.event.comment_cats_disable[key].new = false;
            });
            $scope.newcomment.category = $scope.event.comment_cats[id];
        };

        $scope.open_image = function() {
           window.open('/uploaded/files/' + $scope.event.image, '_blank');
        }

        // Create new Event
        $scope.create = function () {
            var eventCreation = function() {
                $scope.event.map_bounding_box = [];
                $scope.event.map_bounding_box[0] = $scope.bounds.southWest.lat;
                $scope.event.map_bounding_box[1] = $scope.bounds.northEast.lat;
                $scope.event.map_bounding_box[2] = $scope.bounds.southWest.lng;
                $scope.event.map_bounding_box[3] = $scope.bounds.northEast.lng;
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
                    map_bounding_box: $scope.event.map_bounding_box,
                    comment_cats: $scope.event.comment_cats,
                    event_tags: $scope.event.event_tags,
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
            };

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
                if(angular.isDefined($scope.markers.marker)) {
                    $scope.event.location_latitude = $scope.markers.marker.lat;
                    $scope.event.location_longitude = $scope.markers.marker.lng;
                    $scope.event.map_bounding_box[0] = $scope.bounds.southWest.lat;
                    $scope.event.map_bounding_box[1] = $scope.bounds.northEast.lat;
                    $scope.event.map_bounding_box[2] = $scope.bounds.southWest.lng;
                    $scope.event.map_bounding_box[3] = $scope.bounds.northEast.lng;
                }
                console.log($scope.event);
                event.$update(function () {
                    $location.path('events/' + event.url);
                }, function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
            };


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
            $scope.events = Events.query({},function() {
                var eventstags = [];

                //Get all event tags
                for(var i = 0; i < $scope.events.length; i++){
                    for(var j = 0;  j < $scope.events[i].event_tags.length; j++){
                        for(var k = 0;  k < eventstags.length; k++){
                            if(eventstags[k].text.toLowerCase() == $scope.events[i].event_tags[j].text.toLowerCase()) {
                                break;
                            }
                        }
                        if(k >= eventstags.length) {
                            eventstags.push($scope.events[i].event_tags[j]);
                        }
                    }
                }
                $scope.eventstags = eventstags;
            });
        };

        // Find existing Event
        $scope.findOne = function () {
            $scope.event = Events.get({
                url: $stateParams.url
            }, function() {
                console.log($scope.event);
                //Initialize the map
                if($scope.event.location_latitude !=- null) {
                    $scope.markers.marker = {};
                    $scope.markers.marker.lat = $scope.event.location_latitude;
                    $scope.markers.marker.lng = $scope.event.location_longitude;
                    $scope.markers.marker.focus = true;
                    if($location.path().replace($stateParams.url,'').contains('edit')) {
                        $scope.markers.marker.draggable = true;
                    }
                    console.log($scope.event.map_bounding_box);
                    $scope.bounds.southWest.lat = $scope.event.map_bounding_box[0];
                    $scope.bounds.northEast.lat = $scope.event.map_bounding_box[1];
                    $scope.bounds.southWest.lng = $scope.event.map_bounding_box[2];
                    $scope.bounds.northEast.lng = $scope.event.map_bounding_box[3];
                }
                //Set number of info columns
                if(!$location.path().replace($stateParams.url,'').contains('edit')) {
                    $scope.event_info_col = 0;
                    if($scope.event.time_description){
                        $scope.event_info_col++;
                    }
                    if($scope.event.location_name){
                        $scope.event_info_col++;
                    }
                    if($scope.event.start_datetime || $scope.event.start_datetime){
                        $scope.event_info_col++;
                    }
                    $scope.event_info_col = 12/$scope.event_info_col;
                }

                $scope.image_url = "uploaded/files/" + $scope.event.image + "?dim=1140x400";
                console.log($scope.image_url);
                //Set the buttons for comment categories functionalities
                $scope.event.comment_cats_disable = [];
                angular.forEach($scope.event.comment_cats, function(value, key) {
                    $scope.event.comment_cats_disable[key] = {};
                    $scope.event.comment_cats_disable[key].show = false;
                    $scope.event.comment_cats_disable[key].new = true;
                });
                $scope.newcomment = {};
                $scope.newcomment.category = "";
                $scope.findComments();
            });
        };

     // Create new Comment
    $scope.createcomment = function () {
        var comment = new Comment({
            text: $scope.newcomment.text,
            category: $scope.newcomment.category.text,
            parent_comment: null,
            event: $scope.event._id
        });
        // After save
        comment.$save(function (response) {
            $scope.findComments();
            $scope.newcomment.text ="";
        }, function (errorResponse) {
            $scope.error = errorResponse.data.message;
        });
    };

     // Update exisiting Comment
     $scope.update_comment = function (comment) {
         var getcomment = Comment.get({
             id: comment._id
         }, function() {
             console.log(getcomment);
             getcomment.text = comment.new_text;
             getcomment.$update();
             $scope.findComments();
         });
    };

     // Create new Answer
    $scope.createanswer = function (index, id) {
        console.log(id);
        console.log(index);
        var comment = new Comment({
            text: $scope.newanswer[index].text,
            category: null,
            parent_comment: id,
            event: $scope.event._id
        });
        // After save
        comment.$save(function (response) {
            $scope.findComments();
            $scope.newanswer[index].text = "";
        }, function (errorResponse) {
            $scope.error = errorResponse.data.message;
        });
    };

     // Remove existing Comment
     $scope.removeComment = function (comment) {
         if (comment) {
             if(angular.isDefined(comment.answers)){
                for(var i = 0; i < comment.answers.length; i++) {
                    var getanswer = Comment.get({
                        id: comment.answers._id
                    }, function() {
                        getanswer.$remove();
                    });
                }
             }
             var getcomment = Comment.get({
                 id: comment._id
             }, function() {
                 getcomment.$remove();
                 $scope.findComments();
             });

        } else {
            $scope.comment.$remove(function () {
                $scope.findComments();
            });
        }
    };

        // Find a list of Comments
        $scope.findComments = function () {

            $scope.comments = Comments.query({
                id: $scope.event._id
            }, function() {
                // Find the answers and add them into the comment
                for(var i = 0; i < $scope.comments.length; i++) {
                    if($scope.comments[i].parent_comment != null) {
                        for(var j = 0; j < $scope.comments.length; j++) {
                            if($scope.comments[j]._id == $scope.comments[i].parent_comment) {
                                if(angular.isUndefined($scope.comments[j].answers)) {
                                    $scope.comments[j].answers = [];
                                }
                                $scope.comments[j].answers.push($scope.comments[i]);
                            }
                        }
                        $scope.comments.splice(i, 1);
                        i--;
                    }
                }
                setTimeout(function () {
                    if($location.hash() != "") {
                       $scope.scrollToComment($location.hash());
                    }
                });

            });
            $scope.show_answer = [];
            $scope.newanswer = [];
        };


 }
]);
