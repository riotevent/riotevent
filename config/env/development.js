'use strict';

module.exports = {
	db: 'mongodb://localhost/riotevent-dev',
	app: {
		title: 'riotevent - Development Environment'
	},
    mailer: {
        from: process.env.MAILER_FROM || 'MAILER_FROM',
        options: null
    }
};
