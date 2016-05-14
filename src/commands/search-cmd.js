'use strict';

export default class SearchCommand {

  constructor(telegram, scraper) {
    this.telegram = telegram;
    this.scraper = scraper;
  }

  execute(state, ...params) {
    let term = '';
    if (params.length > 0)
      term = params[0].join(' ');
    
    if(!state.lang) {
      this.telegram.sendMessage({
        chat_id: state.chat.id,
        text: `Before searching set the language\nuse */lang {country code}*\n for example /lang US for United State store`,
        parse_mode: 'Markdown'
      });

      return null;
    }

    this.telegram.sendChatAction(state.chat.id, 'typing');

    this.scraper.searchApp(term, state.lang)
      .then((res) => {

        if (res.resultCount === 0) {
          this.telegram.sendMessage({
            chat_id: state.chat.id,
            text: `No App found`
          });
        }
        else {
          let keys = [];
          let reply_markup = '';
          res.results.forEach((item) => {
            keys.push([`/add ${item.trackId} (${item.trackName})`]);
          });
          reply_markup = { keyboard: keys, resize_keyboard: true, one_time_keyboard: true };

          this.telegram.sendMessage({
            chat_id: state.chat.id,
            text: `Choose the App to monitor`,
            parse_mode: 'Markdown',
            reply_markup: reply_markup
          });
        }
      });
  }
}
