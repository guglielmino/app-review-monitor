/**
 * Created by fabrizio on 30/03/16.
 */

class TelegramChatter {

	constructor() {
		this.states = {};
		this.commands = {};
	}

	processRequest(res) {
		if (res.result) {
			let lastupdateId = 0;
			let self = this;

			res.result.forEach((value) => {
				lastupdateId = value.update_id + 1;

				const symChatId = value.message.chat.id;
				if (!this.states[symChatId]) {
					this.states[symChatId] = {chat: value.message.chat};
				}

				const readText = value.message.text.toLowerCase();
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
				}
			});

			return lastupdateId;
		}
	}

	addCommand(key, cmd) {
		this.commands[key.toLowerCase()] = cmd;
	}

}

module.exports = TelegramChatter;
