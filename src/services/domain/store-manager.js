/**
 * Created by fabrizio on 12/04/16.
 */
// CronJop doen't works well with import
let CronJob = require('cron').CronJob;

export default class StoreManager {
  constructor(appsProvider, storeScraper) {
    this.appsProvider = appsProvider;
    this.scraper = storeScraper;
 
    this.job = new CronJob({
      cronTime: '30 * * * * *',
      onTick: this._timerFunc.bind(this),
      start: false,
      timeZone: 'Europe/Rome'
    });
  }

  start() {
    this.job.start();
  }

  _timerFunc() {
    console.log("_timerFunc");
    this.appsProvider
      .getAllApps()
      .then((res) => {
        console.log("_timerFunc => " + JSON.stringify(res));
        if (res) {
          res.forEach((item) => {
            console.log(`Getting review for ${item.appName}`);
            this.scraper
              .getAppReviewsByAppId(item.appId)
              .then((res) => {
                if (res) {
                  let authors = res.filter(value => value.hasOwnProperty('author'));
                  authors.forEach((item) => {
                    console.log("\n\t" + item.id.label + " AUTHORS " + item.title.label + " rat " + item['im:rating'].label + "\n" + item.content.label);
                  });
                }
              });
          });
        }
      });
  }
}