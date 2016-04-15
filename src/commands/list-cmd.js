'use strict';

export default class ListCommand {

  constructor(telegram, appsProvider) {
    this.telegram = telegram;
    this.appsProvider = appsProvider;
  }

  execute(chat, ...params) {

    this.appsProvider
      .getApps(chat.username)
      .then((res) => {
        let message = 'No Apps registered for monitoring';

        if (res.length > 0) {
          message = '';
          res.forEach((item) => {
            message += `*${item.appName}*\n/remove ${item.appId}\n`;
          });
        }

        this.telegram.sendMessage({
          chat_id: chat.id,
          text: message,
          parse_mode: 'Markdown'
        });
      });
  }

}
