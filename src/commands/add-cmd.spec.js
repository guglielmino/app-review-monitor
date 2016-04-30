'use strict';

import chai from 'chai';
import sinon from 'sinon';

import AddCommand from './add-cmd';

chai.should();

describe('AddCommand', ()=> {
	let command;
	let telegram;

	beforeEach(() => {
		telegram = {};
		telegram.sendMessage = sinon.stub();

		const appsProvider = {};
		appsProvider.save = sinon.stub();
		command = new AddCommand(telegram, appsProvider);
	});

	it('Should fail when there is not appId', ()=> {
		const state = { chat: { id: 12 }, lang: 'IT' };
		command.execute(state);

		telegram.sendMessage.calledWith({
			chat_id: 12,
			text: 'Use /add AppId_to_monitor [app_name]',
			parse_mode: 'Markdown'
		})
			.should.be.ok;
	});

	it('Should fail when chat.usename is undefined', ()=> {
		const state = { chat: { id: 12 }, lang: 'IT' };
		command.execute(state, ['1234', '(AppName)']);

		telegram.sendMessage.calledWith({
			chat_id: 12,
			text: `Sorry, can\'t add AppName to Your monitor list`,
			parse_mode: 'Markdown'
		})
			.should.be.ok;
	});

	it('Should succeed when username is valid', () => {
		const state = { chat: { id: 12, username: 'testuser' }, lang: 'IT' };
		command.execute(state, ['1234', '(AppName)']);

		telegram.sendMessage.calledWith({
			chat_id: 12,
			text: 'Added AppName to reviews monitor',
			parse_mode: 'Markdown'
		})
			.should.be.ok;
	});

});

