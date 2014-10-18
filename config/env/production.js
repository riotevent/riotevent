'use strict';

module.exports = {
	db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/mean',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.min.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.min.css',
				'public/lib/font-awesome/css/font-awesome.min.css',
				'public/lib/leaflet-dist/leaflet.css',
				'public/lib/ng-tags-input/ng-tags-input.min.css'
			],
			js: [
				'public/lib/jquery/dist/jquery.min.js',
				'public/lib/angular/angular.min.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-cookies/angular-cookies.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-touch/angular-touch.js',
				'public/lib/angular-sanitize/angular-sanitize.js',
				'public/lib/angular-ui-router/release/angular-ui-router.min.js',
				'public/lib/angular-ui-utils/ui-utils.min.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
				'public/lib/textAngular/dist/textAngular-sanitize.min.js',
				'public/lib/textAngular/dist/textAngular.min.js',
				'public/lib/leaflet-dist/leaflet.js',
				'public/lib/angular-leaflet-directive/dist/angular-leaflet-directive.min.js',
				'public/lib/select2/select2.min.js',
				'public/lib/angular-ui-select2/src/select2.min.js',
                'public/lib/ng-file-upload/angular-file-upload.min.js',
                'public/lib/angular-scroll/angular-scroll.min.js',
                'public/lib/angular-translate/angular-translate.min.js',
                'public/lib/angular-translate-storage-cookie/angular-translate-storage-cookie.min.js',
                'public/lib/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js',
                'public/lib/angular-dynamic-locale/tmhDynamicLocale.min.js',
                'public/lib/ngLocale/angular-locale_fr-fr.min.js',
                'public/lib/ngLocale/angular-locale_en-gb.min.js'
			]
		},
		css: 'public/dist/application.min.css',
		js: 'public/dist/application.min.js'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};
