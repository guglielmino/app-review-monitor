'use strict';

export default class AddCommand {

	constructor(telegram, appsProvider) {
		this.telegram = telegram;
		this.appsProvider = appsProvider;
	}

	execute(state, ...params) {
		let appId = 0;
		let appName = '';

		if (params.length > 0 && params[0].length > 1) {
			appId = params[0][0];
			params[0].shift();
			appName = params[0].join(' ');
			appName = appName.slice(1, appName.length - 1);
		}
		else {
			this.telegram.sendMessage({
				chat_id: state.chat.id,
				text: `Use /add AppId_to_monitor [app_name]`,
				parse_mode: 'Markdown'
			});
			return null;
		}

		let message = `Sorry, can\'t add ${appName} to Your monitor list`;
		if (state.chat.username) {
			message = `Added ${appName} to reviews monitor`;

			this.appsProvider
				.save({
					chat_id: state.chat.id,
					username: state.chat.username,
					appId: appId,
					appName: appName,
					lang: state.lang
				});
		}
	
		this.telegram.sendMessage({
			chat_id: state.chat.id,
			text: message,
			parse_mode: 'Markdown'
		});
		
		return null;
	}

}
