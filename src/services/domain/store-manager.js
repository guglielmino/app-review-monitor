/**
 * Created by fabrizio on 12/04/16.
 */
// CronJop doen't works well with import
let CronJob = require('cron').CronJob;

export default class StoreManager {
	constructor(appsProvider, storeScraper, telegram) {
		this.appsProvider = appsProvider;
		this.scraper = storeScraper;
		this.telegram = telegram;

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
					res.forEach((app) => {
						console.log(`Getting review for ${app.appName}`);
						this.scraper
							.getAppReviewsByAppId(app.appId, app.lang)
							.then((res) => {
								if (res) {
									let authors = res.filter(value => value.hasOwnProperty('author'));
									let message = '';
									this.telegram
										.sendMessage({
											chat_id: app.chat_id,
											text: `Reviews for *${app.appName}*`,
											parse_mode: 'Markdown'
										});
									authors.slice(0, Math.min(3, authors.length)).forEach((item) => {
										const rating = '⭐️'.repeat(Number.parseInt(item['im:rating'].label));

										message = `Author: *${item['author'].name.label}* ${rating}\n_${item.title.label}_ \n${item.content.label}`;

										this.telegram
											.sendMessage({
												chat_id: app.chat_id,
												text: message,
												parse_mode: 'Markdown'
											});
										console.log(message);
									});
								}
							});
					});
				}
			});
	}
}