'use strict';

export default class AddCommand {

  constructor(telegram, appsProvider) {
    this.telegram = telegram;
    this.appsProvider = appsProvider;
  }

  execute(chat, ...params) {
    let appId = 0;
    let appName = '';
    
    if (params.length > 0 && params[0].length > 1) {
      appId = params[0][0];
      params[0].shift();
      appName = params[0].join(' ');
    }

    this.telegram.sendMessage({
      chat_id: chat.id,
      text: `Added ${appId} to reviews monitor`,
      parse_mode: 'Markdown'
    });
    

    this.appsProvider
      .save({
        chat_id: chat.id,
        username: chat.username,
        appId: appId,
        appName: appName
       });
  }

}
