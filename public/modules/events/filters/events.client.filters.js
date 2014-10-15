'use strict';

angular.module('events').filter('eventSort', function () {
    return function (input, today) {
        var past = [], futur = [], no_date = [];
        for(var i = 0; i < input.length; i++) {
            if(input[i].start_datetime == null) {
                no_date.push(input[i]);
            }
            else {
                var date = new Date(input[i].start_datetime);
                date = +date;
                if(date > today) {
                    futur.push(input[i]);
                }
                else {
                    past.push(input[i]);
                }
            }
        }
        futur = futur.sort();
        futur = futur.reverse();
        past = past.sort();
        return futur.concat(past).concat(no_date);
    }
});

angular.module('events').filter('tagFilter', function () {
    return function (input, tags) {
        var filtered = []
        if(angular.isDefined(tags) && tags.length > 0 ) {
            for(var i = 0; i < input.length; i++) {
                var have_tags = true;
                for(var j = 0; j < tags.length && have_tags == true; j++) {
                    have_tags = false;
                    for(var k = 0; k < input[i].event_tags.length && input[i].event_tags[k].text.toLowerCase() != tags[j].text.toLowerCase(); k++) {}
                    if(k < input[i].event_tags.length) {
                        have_tags = true;
                    }
                }
                if(have_tags == true) {
                    filtered.push(input[i]);
                }
            }
        }
        else {
            filtered = input;
        }
        return filtered;
    }
});

angular.module('events').filter('linebrk', function () {
    return function(input) {
        return input.replace(/\n/g, '<br>');
    };
});
