/**
 * Created by fabrizio on 30/03/16.
 */

class TelegramChatter {

	constructor(logger) {
		this.states = {};
		this.commands = {};
		this.logger = logger;
	}

	processRequest(request) {
		let lastupdateId = request.update_id + 1;

		const symChatId = request.message.chat.id;
		if (!this.states[symChatId]) {
			this.states[symChatId] = { chat: request.message.chat };
		}

		const readText = request.message.text.toLowerCase();
		const cli = readText.startsWith('/') ? readText.split(' ') : [];

		if (cli.length > 0) {
			if (this.commands.hasOwnProperty(cli[0])) {
				let cmd = this.commands[cli[0]];
				if (cmd) {
					const resp = cmd.execute(this.states[symChatId], cli.slice(1));
					if (resp) {
						Object.keys(resp).forEach((key) => {
							this.states[symChatId][key] = resp[key];
						});
					}
				}
			}
			else{
				logger.debug("Unrecognized command " + JSON.stringify(request));
			}
		}
	}

	/*
	processRequest_OLD(res) {
		if (res.result) {
			let lastupdateId = 0;
			let self = this;

			res.result.forEach((request) => {

				lastupdateId = request.update_id + 1;

				const symChatId = request.message.chat.id;
				if (!this.states[symChatId]) {
					this.states[symChatId] = { chat: request.message.chat };
				}

				const readText = request.message.text.toLowerCase();
				const cli = readText.startsWith('/') ? readText.split(' ') : [];

				if (cli.length > 0) {
					if (this.commands.hasOwnProperty(cli[0])) {
						let cmd = this.commands[cli[0]];
						if (cmd) {
							const resp = cmd.execute(this.states[symChatId], cli.slice(1));
							if (resp) {
								Object.keys(resp).forEach((key) => {
									this.states[symChatId][key] = resp[key];
								});
							}
						}
					}
					else{
						logger.info("Unrecognized command " + JSON.stringify(request));
					}
				}
			});

			return lastupdateId;
		}
	}
	*/

	addCommand(key, cmd) {
		this.commands[key.toLowerCase()] = cmd;
	}

}

module.exports = TelegramChatter;
