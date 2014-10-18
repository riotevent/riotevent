

angular.module(ApplicationConfiguration.applicationModuleName).config(['tmhDynamicLocaleProvider', function (tmhDynamicLocaleProvider) {
    tmhDynamicLocaleProvider.localeLocationPattern('lib/ngLocale/angular-locale_{{locale}}.js');
    console.log('hello locale !)');
}])


angular.module(ApplicationConfiguration.applicationModuleName).config(['$translateProvider',
    function($translateProvider) {
        $translateProvider.translations('en', {
            'INDE_EVENT_PLATFORM': "Independant Event Platform",
            'EVENTS_LIST': "Events list",
            'CREATE_EVENT': "Create an event",
            'EDIT_PROFILE': "Edit Profile",
            'CHANGE_PASSWORD': "Change password",
            'SIGNOUT': "Signout",
            'SIGNIN': "Signin",
            'SIGNUP': "Signup",
            'LEARN_MORE': "Learn more",
            'SELECT_TAG': "Select tags",
            'TEXT_SEARCH': "Text search",
            'STARTING': "Starting",
            'UNTIL': "until",
            'TODAY': "Today",
            'TOMORROW': "Tomorrow",
            'IN_X_DAYS': "In {{days}} days",
            'IN_ONE_MONTH': "In one month",
            'IN_X_MONTHS': "In {{days}} months",
            'IN_ONE_YEAR': "In one year",
            'IN_X_YEARS': "In {{days}} years",
            'YESTERDAY': "Yesterday",
            'X_DAYS_AGO': "{{days}} days ago",
            'ONE_MONTH_AGO': "One month ago",
            'X_MONTHS_AGO': "{{days}} months ago",
            'ONE_YEAR_AGO': "One year ago",
            'X_YEARS_AGO': "{{days}} years ago",
        });

        $translateProvider.translations('fr', {
            'INDE_EVENT_PLATFORM': "Plateforme d'événements indépendante",
            'EVENTS_LIST': "Liste d'événements",
            'EVENTS_LIST': "Liste d'événements",
            'CREATE_EVENT': "Créer un événement",
            'EDIT_PROFILE': "Editer profil",
            'CHANGE_PASSWORD': "Changer mot de passe",
            'SIGNOUT': "Déconnexion",
            'SIGNIN': "Connexion",
            'SIGNUP': "Inscription",
            'LEARN_MORE': "En savoir plus",
            'SELECT_TAG': "Séléctionner des étiquettes",
            'TEXT_SEARCH': "Recherche par texte",
            'STARTING': "Commence le",
            'UNTIL': "jusqu'au",
            'TODAY': "Aujourd'hui",
            'TOMORROW': "Demain",
            'IN_X_DAYS': "Dans {{days}} jours",
            'IN_ONE_MONTH': "Dans une mois",
            'IN_X_MONTHS': "Dans {{days}} mois",
            'IN_ONE_YEAR': "Dans un an",
            'IN_X_YEARS': "Dans {{days}} ans",
            'YESTERDAY': "Hier",
            'X_DAYS_AGO': "Il y a {{days}} jours",
            'ONE_MONTH_AGO': "Il y a un mois",
            'X_MONTHS_AGO': "Il y a {{days}} mois",
            'ONE_YEAR_AGO': "Il y a un an",
            'X_YEARS_AGO': "Il y a {{days}} ans",
        });


        $translateProvider.preferredLanguage('fr');
	}
]);
