'use strict';


angular.module('events').directive('nextDays', ['$translate', function ($translate) {
    return {
        restrict: 'E',
        translude: true,
        template: '{{nextdate}}',
        scope: {
            date: '=date',
            today: '=today'
        },
        link: function ($scope) {


            if($scope.date !== null) {
                var date = new Date($scope.date);
                date = +date;
                var difference = (date - $scope.today)/86400000+1;

                if(difference > 0 && difference <= 1) {
                    $translate('TODAY').then(function (nextdate) {
                        $scope.nextdate = nextdate;
                    });
                }
                else if(difference > 1  && difference <= 2) {
                    $translate('TOMORROW').then(function (nextdate) {
                        $scope.nextdate = nextdate;
                    });
                }
                else if(difference > 2 && difference <= 30){
                    $translate('IN_X_DAYS', { days: parseInt(difference)}).then(function (nextdate) {
                        $scope.nextdate = nextdate;
                    });
                }
                else if(difference > 30 && difference <= 60) {
                    $translate('IN_ONE_MONTH').then(function (nextdate) {
                        $scope.nextdate = nextdate;
                    });
                }
                else if(difference > 60 && difference <= 365) {
                    $translate('IN_X_MONTHS', { days: parseInt(difference/30)}).then(function (nextdate) {
                        $scope.nextdate = nextdate;
                    });
                }
                else if(difference > 365 && difference <= 730) {
                    $translate('IN_ONE_YEAR').then(function (nextdate) {
                        $scope.nextdate = nextdate;
                    });
                }
                else if(difference > 730) {
                    $translate('IN_X_YEARS', { days: parseInt(difference/365)}).then(function (nextdate) {
                        $scope.nextdate = nextdate;
                    });
                }
                else if(difference > -1 && difference <= 0) {
                    $translate('YESTERDAY').then(function (nextdate) {
                        $scope.nextdate = nextdate;
                    });
                }
                else if(difference > -30 && difference <= -1) {
                    $translate('X_DAYS_AGO', { days:  Math.abs(parseInt(difference)-1)}).then(function (nextdate) {
                        $scope.nextdate = nextdate;
                    });
                }
                else if(difference > -60 && difference <= -30) {
                    $translate('ONE_MONTH_AGO').then(function (nextdate) {
                        $scope.nextdate = nextdate;
                    });
                }
                else if(difference > -365 && difference <= -60) {
                    $translate('X_MONTHS_AGO', { days:  Math.abs(parseInt((difference-1)/30))}).then(function (nextdate) {
                        $scope.nextdate = nextdate;
                    });
                }
                else if(difference > -730 && difference <= -365) {
                    $translate('ONE_YEAR_AGO').then(function (nextdate) {
                        $scope.nextdate = nextdate;
                    });
                }
                else if(difference < -730) {
                    $scope.nextdate = Math.abs(parseInt((difference-1)/365)) + ' years ago';
                    $translate('X_YEARS_AGO', { days:  Math.abs(parseInt((difference-1)/365))}).then(function (nextdate) {
                        $scope.nextdate = nextdate;
                    });
                }
            }
            else {
                difference = null;
            }
            return difference;
        }
    };
}]);

angular.module('events').directive('eventDatepicker', function () {
    return {
        restrict: 'E',
        templateUrl: 'modules/events/views/datepicker-directive-view.html',
        controller: function ($scope) {
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
            $scope.dateOptions = {
                startingDay: 1
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


angular.module('events').directive('eventComments', function ($filter, $location) {
    return {
        restrict: 'E',
        templateUrl: 'modules/events/views/event-comment-directive-view.html',
        controller: function ($scope) {

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

            $scope.link_comment = function (id) {
                $location.hash(id);
                $scope.scrollToComment(id);
            }
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

                            mapbox: {
                                name: 'MapBox',
                                type: 'xyz',
                                url: 'https://{s}.tiles.mapbox.com/v4/remigr.jol982fa/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicmVtaWdyIiwiYSI6InB4U3paSGcifQ.L4qx28EnpGrtnzDVprytQQ#3'
                            },
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

angular.module('events').directive('mapEventView', function ($http) {
    return {
        restrict: 'E',
        templateUrl: 'modules/events/views/map-view-event-directive.view.html',
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

                            mapbox: {
                                name: 'MapBox',
                                type: 'xyz',
                                url: 'https://{s}.tiles.mapbox.com/v4/remigr.jol982fa/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicmVtaWdyIiwiYSI6InB4U3paSGcifQ.L4qx28EnpGrtnzDVprytQQ#3'
                            },
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

            }
        }
    };
});
