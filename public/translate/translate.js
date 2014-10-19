angular.module(ApplicationConfiguration.applicationModuleName).config(['tmhDynamicLocaleProvider', function (tmhDynamicLocaleProvider) {
    tmhDynamicLocaleProvider.localeLocationPattern('lib/ngLocale/angular-locale_{{locale}}.js');
}])

angular.module(ApplicationConfiguration.applicationModuleName).config(['$translateProvider',
    function($translateProvider) {

        $translateProvider.useCookieStorage();
        $translateProvider.useStaticFilesLoader({
            prefix: 'translate/locales/locale-',
            suffix: '.json'
        });
        $translateProvider.registerAvailableLanguageKeys(['en', 'fr']);
        $translateProvider.determinePreferredLanguage();
        $translateProvider.fallbackLanguage('en');

	}
]);
