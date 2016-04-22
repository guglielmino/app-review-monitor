/**
 * Created by fabrizio on 12/04/16.
 */
// CronJop doen't works well with import
let CronJob = require('cron').CronJob;

export default class StoreManager {
	constructor(appsProvider, storeScraper, telegram, cronString) {
		this.appsProvider = appsProvider;
		this.scraper = storeScraper;
		this.telegram = telegram;


		this.job = new CronJob({
			cronTime: cronString,
			onTick: this._timerFunc.bind(this),
			start: false,
			timeZone: 'Europe/Rome'
		});
	}

	start() {
		this.job.start();
	}

	_timerFunc() {
		this.appsProvider
			.getAllApps()
			.then((apps) => {
				if (apps && apps.length > 0) {
					apps.forEach((app) => {
						this.scraper
							.getAppReviewsByAppId(app.appId, app.lang)
							.then((res) => {
								if (res && res.length > 0 ) {
									let authors = res.filter(value => value.hasOwnProperty('author'));

									if (authors[0].id.label != app.lastreviewId) {

										if (authors.length > 0) {
											this.appsProvider
												.updateApp(app.appId, {lastreviewId: authors[0].id.label});
										}

										let message = '';
										this.telegram
											.sendMessage({
												chat_id: app.chat_id,
												text: `Reviews for *${app.appName}*\n\n`,
												parse_mode: 'Markdown'
											});
										authors.slice(0, Math.min(3, authors.length)).forEach((item) => {
											const rating = '⭐️'.repeat(Number.parseInt(item['im:rating'].label));

											message = `*${item['author'].name.label}* ${rating}\n_${item.title.label}_ \n${item.content.label}`;

											this.telegram
												.sendMessage({
													chat_id: app.chat_id,
													text: message,
													parse_mode: 'Markdown'
												});
										});
									}
								}
							});
					});
				}
			});
	}
}