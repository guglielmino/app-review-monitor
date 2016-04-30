'use strict';

import chai from 'chai';
import sinon from 'sinon';

import HelpCommand from './help-cmd';

chai.should();

describe('HelpCommand', ()=> {
	let command;
	let telegram;

	beforeEach(() => {
		telegram = {};
		telegram.sendMessage = sinon.stub();
		command = new HelpCommand(telegram);
	});

	it('Should emit help phrase when called', () => {
		const helpMessage = '/search \"name\" - search for apps by name\n\
/list - get apps You are monitoring\n\
/add - add a new app to monitor\n\
/remove - remove an app from monitoring';

		command.execute({ chat: { id: 12 } });

		telegram.sendMessage.calledWith({
			chat_id: 12,
			text: helpMessage,
			parse_mode: 'Markdown'
		}).should.be.ok;

	});
	
});