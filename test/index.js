'use strict';

var nock = require('nock');

var io     = require('../server');
var config = require('../config');

before(function() {
	return nock(config.api).persist()
		.get('/auth')
			.replyWithFile(200, './test/mocks/user.json')
		.get('/boards/found')
			.replyWithFile(200, './test/mocks/board.json')
		.get('/boards/notfound')
			.reply(404);
});

before(function() {
	io.listen(config.port);
	this.server = 'http://localhost:' + config.port;
});

describe('Basic Usage', function() {

	var context = { }

	describe('Connecting',
		require('./spec/connecting')(context));

	describe('Joining a room',
		require('./spec/joining-a-room')(context));

	describe('Leaving a room',
		require('./spec/leaving-a-room')(context));
});
