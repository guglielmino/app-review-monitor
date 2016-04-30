'use strict';

const helpMessage = '/search \"name\" - search for apps by name\n\
/list - get apps You are monitoring\n\
/add - add a new app to monitor\n\
/remove - remove an app from monitoring';

export default class HelpCommand {

	constructor(telegram) {
		this.telegram = telegram;
	}

	execute(state, ...params) {
		this.telegram.sendMessage({
			chat_id: state.chat.id,
			text: helpMessage,
			parse_mode: 'Markdown'
		});

		return null;
	}

}
