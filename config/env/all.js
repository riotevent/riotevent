'use strict';

module.exports = {
	app: {
		title: 'riotevent',
		description: 'event website',
		keywords: 'event'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
				'public/lib/font-awesome/css/font-awesome.css',
				'public/lib/leaflet-dist/leaflet.css',
				'public/lib/ng-tags-input/ng-tags-input.css'
			],
			js: [
				'public/lib/jquery/dist/jquery.js',
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-cookies/angular-cookies.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-touch/angular-touch.js',
				'public/lib/angular-sanitize/angular-sanitize.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/textAngular/src/textAngular-sanitize.js',
				'public/lib/textAngular/src/textAngularSetup.js',
				'public/lib/textAngular/src/textAngular.js',
				'public/lib/leaflet-dist/leaflet-src.js',
				'public/lib/angular-leaflet-directive/dist/angular-leaflet-directive.js',
				'public/lib/ng-tags-input/ng-tags-input.js',
                'public/lib/ng-file-upload/angular-file-upload.js'
			]
		},
		css: [
			'public/modules/*/less/*.css',
		],
		less: [
            'public/modules/*/less/*.less'
        ],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};
