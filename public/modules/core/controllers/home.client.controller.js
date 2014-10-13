'use strict';
angular.module('core').controller('HomeController', ['$scope', '$document', 'Authentication', '$window',
function ($scope,  $document, Authentication, $window) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $window.scrollTo(0, 0);

        var event_home_info = angular.element(document.getElementById('event_home_info'));
        $scope.scrollToInfo = function () {
            $document.scrollToElement(event_home_info, 80, 800);
        };

}
]);
