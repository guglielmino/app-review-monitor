'use strict';

export default class RemoveCommand {

	constructor(telegram, appsProvider) {
		this.telegram = telegram;
		this.appsProvider = appsProvider;
	}

	execute(state, ...params) {


		if (params.length > 0) {
			let appId = params[0][0];
			params[0].shift();
			let appName = params[0].join(' ');



			this.appsProvider
				.remove({ username: state.chat.username, appId: appId })
				.then((res) => {

					console.log(`${appName} removed`);

					this.telegram.sendMessage({
						chat_id: state.chat.id,
						text: `${appName} removed`,
						parse_mode: 'Markdown'
					});
				});
			
		}
		else {
			this.telegram.sendMessage({
				chat_id: state.chat.id,
				text: 'Use /remove AppId_to_remove',
				parse_mode: 'Markdown'
			});
		}



		return null;
	}
}
