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
        text: `Use */add AppId_to_monitor`,
        parse_mode: 'Markdown'
      });
      return null;
    }

    this.telegram.sendMessage({
      chat_id: state.chat.id,
      text: `Added ${appId} to reviews monitor`,
      parse_mode: 'Markdown'
    });
    

    this.appsProvider
      .save({
        chat_id: state.chat.id,
        username: state.chat.username,
        appId: appId,
        appName: appName,
        lang: state.lang
       });
    
    return null;
  }

}
