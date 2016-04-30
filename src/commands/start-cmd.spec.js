'use strict';

import chai from 'chai';
import sinon from 'sinon';

import StartCommand from './start-cmd';

chai.should();


describe('StartCommand', ()=> {
	let command;
	let telegram;
	let userProvider;

	beforeEach(() => {
		telegram = {};
		userProvider = {};

		telegram.sendMessage = sinon.stub();
		userProvider= sinon.stub();

		command = new StartCommand(telegram, userProvider);
	});

	it('Should emit start text', () => {
		const welcomeText = "*Welcome to App Monitor*\n\n\
this bot let You monitor App Sore Apps for new reviews.\n\
Use /add to add a new app and when new review are posted by user You'll\n\
be updated by the bot\n\n\
/search \"name\" - search for apps by name\n\
/list - get your app list\n\
/add - add a new app to monitor\n\
/remove - remove an app from monitoring\n\n\
Before starting set the code for the store You want to use\n\
for example: /lang US (for United State store)";

		command.execute({ chat: { id: 12 }});

		telegram.sendMessage.calledWith({
			chat_id: 12,
			text: welcomeText,
			parse_mode: 'Markdown'
		}).should.be.ok;
	});
});