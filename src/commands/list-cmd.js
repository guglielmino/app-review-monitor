'use strict';

export default class ListCommand {

	constructor(telegram, appsProvider) {
		this.telegram = telegram;
		this.appsProvider = appsProvider;
	}

	execute(state, ...params) {
		if (!state.chat.username) {
			this.telegram.sendMessage({
				chat_id: state.chat.id,
				text: 'No Apps in monitor list',
				parse_mode: 'Markdown'
			});
		}

		this.appsProvider
			.getApps(state.chat.username)
			.then((res) => {

				let message = 'No Apps registered for monitoring';
				let reply_markup = '';
				let keys = [];

				if (res.length > 0) {
					message = '';

					res.forEach((item) => {
						keys.push([`/remove ${item.appId} (${item.appName})`]);
					});
					reply_markup = { keyboard: keys, resize_keyboard: true, one_time_keyboard: true };
					message = 'Here are Your monitored Apps. Select one if You want to remove it.';
				}
				else {
					message = 'No App monitored, search for Apps and add them to monitoring';
				}

				this.telegram.sendMessage({
					chat_id: state.chat.id,
					text: message,
					parse_mode: 'Markdown',
					reply_markup: reply_markup
				});
			})
			.catch((err) => {
				this.telegram.sendMessage({
					chat_id: state.chat.id,
					text: 'List cannot be get now, retry later',
					parse_mode: 'Markdown'
				});
			});

		return null;
	}

}
