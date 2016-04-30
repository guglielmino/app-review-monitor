'use strict';

import chai from 'chai';
import sinon from 'sinon';

chai.should();

import ListCommand from './list-cmd';

describe('ListCommand', ()=> {
	let command;
	let telegram;
	
	let keys = [
		[`/remove 1 (test1)`],
		[`/remove 2 (test2)`],
		[`/remove 3 (test3)`]
	];

	beforeEach(() => {
		telegram = {};
		telegram.sendMessage = sinon.stub();

		const appsProvider = {};
		const apps = [
			{ appId: 1, appName: 'test1' },
			{ appId: 2, appName: 'test2' },
			{ appId: 3, appName: 'test3' }
		];
		appsProvider.getApps = sinon.stub().returns(Promise.resolve(apps));

		command = new ListCommand(telegram, appsProvider);
	});

	it('Should return app lists', () => {
		const awaitendAnswer = {
			chat_id: 12,
			text: 'Here are Your monitored Apps. Select one if You want to remove it.',
			parse_mode: 'Markdown',
			reply_markup: { keyboard: keys, resize_keyboard: true, one_time_keyboard: true }
		};

		command.execute({ chat: { id: 12 } });

		telegram.sendMessage
			.calledWith(awaitendAnswer)
			.should.be.ok;
	});

});