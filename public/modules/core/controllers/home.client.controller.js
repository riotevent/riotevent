'use strict';
angular.module('core').controller('HomeController', ['$scope', '$document', 'Authentication', '$window',
function ($scope,  $document, Authentication, $window) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $window.scrollTo(0, 0);
}
]);
