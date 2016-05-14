'use strict';

import chai from 'chai';
import sinon from 'sinon';

import RemoveCommand from './remove-cmd';

chai.should();

describe('AddCommand', ()=> {

	it('Should fail when not appId is passed', () => {
		const telegram = {};
		telegram.sendMessage = sinon.stub();

		const appsProvider = {};
		appsProvider.remove = sinon.stub().returns(Promise.resolve({}));
		const command = new RemoveCommand(telegram, appsProvider);

		const state = {chat: {id: 12}, lang: 'IT'};
		command.execute(state);

		telegram.sendMessage.calledWith({
			chat_id: 12,
			text: 'Use /remove AppId_to_remove',
			parse_mode: 'Markdown'
		})
			.should.be.ok;
	});

	it('Should succeed when appId is passed', sinon.test(() => {
		const telegram = {};
		telegram.sendMessage = sinon.stub();

		const appsProvider = {};
		appsProvider.remove = sinon.stub().returns(Promise.resolve({}));
		const command = new RemoveCommand(telegram, appsProvider);

		const state = {chat: {id: 12}, lang: 'IT'};
		command.execute(state, ['1234', '(TestApp)']);

		telegram.sendMessage
			.calledWith({
				chat_id: 12,
				text: '(TestApp) removed',
				parse_mode: 'Markdown'
			}).should.be.ok;

		}));

});
