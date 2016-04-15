'use strict';

export default class RemoveCommand {

  constructor(telegram, appsProvider) {
    this.telegram = telegram;
    this.appsProvider = appsProvider;
  }

  execute(chat, ...params) {
    let appId = 0;
    let appName = '';

    if (params.length > 0 ) {
      appId = params[0][0];
      params[0].shift();
      appName = params[0].join(' ');
    }

    this.appsProvider
      .remove({ username: chat.username, appId: appId })
      .then((res) => {
        this.telegram.sendMessage({
          chat_id: chat.id,
          text: `${appName} removed`,
          parse_mode: 'Markdown'
        });
      });
  }

}
