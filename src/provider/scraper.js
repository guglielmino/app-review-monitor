'use strict';

import Promise from 'bluebird';

class Scraper {

  constructor(request) {
    this._request = request;
  }

  getAppReviewsByAppId(appId) {
    const url = `https://itunes.apple.com/rss/customerreviews/id=${appId}/sortBy=mostRecent/json`;
    return this._request(url)
      .then((res) => {
        let data = JSON.parse(res.body);
        return Promise.resolve(data.feed.entry);
      });
  }

  getByAppId(appId) {
    const url = `http://itunes.apple.com/lookup?id=${appId}`;
    return this._request(url)
      .then((res) => {
        let data = JSON.parse(res.body);
        return Promise.resolve(data);
      });
  }

  searchApp(term, limit = 10) {
    const url = `https://itunes.apple.com/search?term=${term}&entity=software&limit=${limit}`;

    return this._request(url)
      .then((res) => {
        let data = JSON.parse(res.body);
        return Promise.resolve(data);
      });
  }
}

module.exports = Scraper;