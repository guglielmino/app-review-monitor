'use strict';

export default class RemoveCommand {

	constructor(telegram, appsProvider) {
		this.telegram = telegram;
		this.appsProvider = appsProvider;
	}

	execute(state, ...params) {
		let appId = 0;
		let appName = '';

		if (params.length > 0) {
			appId = params[0][0];
			params[0].shift();
			appName = params[0].join(' ');
		}

		this.appsProvider
			.remove({ username: state.chat.username, appId: appId })
			.then((res) => {
				this.telegram.sendMessage({
					chat_id: state.chat.id,
					text: `${appName} removed`,
					parse_mode: 'Markdown'
				});
			});

		return null;
	}
}
