'use strict';

export default class SearchCommand {

  constructor(telegram, scraper) {
    this.telegram = telegram;
    this.scraper = scraper;
  }

  execute(chat, ...params) {
    let term = '';
    if (params.length > 0)
      term = params[0];

    this.telegram.sendChatAction(chat.id, 'typing');

    this.scraper.searchApp(term)
      .then((res) => {

        if (res.resultCount === 0) {
          this.telegram.sendMessage({
            chat_id: chat.id,
            text: `No App found`
          });
        }
        else {
          let keys = [];
          let reply_markup = '';
          res.results.forEach((item) => {
            keys.push([`/add ${item.trackId} (${item.trackName})`]);
            reply_markup = { keyboard: keys, resize_keyboard: true, one_time_keyboard: true };
          });

          this.telegram.sendMessage({
            chat_id: chat.id,
            text: `Choose the App to monitor`,
            parse_mode: 'Markdown',
            reply_markup: reply_markup
          });
        }
      });
  }
}
