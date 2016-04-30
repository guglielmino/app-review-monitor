'use strict';

const welcomeText = '*Welcome to App Monitor*\n\n\
this bot let You monitor App Sore Apps for new reviews.\n\
Use /add to add a new app and when new review are posted by user You\'ll\n\
be updated by the bot\n\n\
/search \"name\" - search for apps by name\n\
/list - get your app list\n\
/add - add a new app to monitor\n\
/remove - remove an app from monitoring\n\n\
Before starting set the code for the store You want to use\n\
for example: /lang US (for United State store)';


export default class StartCommand {

  constructor(telegram, userProvider) {
    this.telegram = telegram;
    this.userProvider = userProvider;
  }

  execute(state, ...params) {

    this.userProvider
      .save(state.chat);

    this.telegram.sendMessage({
      chat_id: state.chat.id,
      text: welcomeText,
      parse_mode: 'Markdown'
    });
    
    return null;
  }
}
