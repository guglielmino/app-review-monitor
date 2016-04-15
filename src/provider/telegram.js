/**
 * Created by fabrizio on 17/03/16.
 */
'use strict';

let Promise = require('bluebird');

class TelegramBot {

  constructor(request, apiKey) {
    this.request = request;
    this.apiKey = apiKey;
  }

  getUpdates(offset, limit, timeout) {
    const url = `https://api.telegram.org/bot${this.apiKey}/getUpdates?offset=${offset}&limit=${limit}&timeout=${timeout}`;

    return this.request(url)
      .then((res) => {
        let data = JSON.parse(res.body);
        return Promise.resolve(data);
      });
  }

  getMe() {
    const url = `https://api.telegram.org/bot${this.apiKey}/getMe`;

    return this.request(url)
      .then((res) => {
        let data = JSON.parse(res.body);
        return Promise.resolve(data);
      });
  }

  sendMessage(msg) {
    let url = `https://api.telegram.org/bot${this.apiKey}/sendMessage`;

    const options = {
      method: 'POST',
      uri: url,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(msg)
    };

    return this.request(options)
      .then((res) => {
        let data = JSON.parse(res.body);
        return Promise.resolve(data);
      });
  }

  sendChatAction(chat_id, action) {
    let url = `https://api.telegram.org/bot${this.apiKey}/sendChatAction?chat_id=${chat_id}&action=${action}`;

    return this.request(url)
      .then((res) => {
        let data = JSON.parse(res.body);
        return Promise.resolve(data);
      });
  }

  setWebhook(hook_url) {
    let url = `https://api.telegram.org/bot${this.apiKey}/setWebhook`;

    const options = {
      method: 'POST',
      uri: url,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: hook_url })
    };

    return this.request(url)
      .then((res) => {
        let data = JSON.parse(res.body);
        return Promise.resolve(data);
      });
  }
}

module.exports = TelegramBot;