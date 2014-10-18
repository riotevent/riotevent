'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus', '$translate', 'tmhDynamicLocale',
	function($scope, Authentication, Menus, $translate, tmhDynamicLocale) {
		$scope.authentication = Authentication;

        $scope.language_set = $translate.use();
        tmhDynamicLocale.set($scope.language_set);

         $scope.changeLanguage = function (langKey) {
             console.log(langKey);
             $translate.use(langKey);
             tmhDynamicLocale.set(langKey);
             $scope.language_set = langKey;
         };

		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);
