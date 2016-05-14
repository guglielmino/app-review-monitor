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
			.removeOrphans()
			.then((res) => {
				this.appsProvider
					.getAllApps()
					.then((apps) => {
						if (apps && apps.length > 0) {
							apps.forEach((app) => {
								this.scraper
									.getAppReviewsByAppId(app.appId, app.lang)
									.then((res) => {
										if (res && res.length > 0) {
											let authors = res.filter(value => value.hasOwnProperty('author'));

											let reviews = authors.slice(0, Math.min(3, authors.length));
											let read_ids = reviews.map(i => i.id.label);
											console.log(`read ${JSON.stringify(read_ids)} app ${JSON.stringify(app.last_review_ids)}`)
											if (!app.last_review_ids || reviews.map(i => i.id.label)
													.filter(x => app.last_review_ids.indexOf(x) >= 0)
													.length == 0) {
												this._messageFactory(app.chat_id, `Reviews for *${app.appName}*`);
												let message = '';
												// array with review shown
												let review_ids = [];

												reviews.forEach((item) => {
													const rating = '⭐️'.repeat(Number.parseInt(item['im:rating'].label));

													review_ids.push(item.id.label);

													message = `*${item['author'].name.label}* ${rating}\n_${item.title.label}_ \n${item.content.label}`;
													this._messageFactory(app.chat_id, message);
												});

												if (authors.length > 0) {
													this.appsProvider
														.updateApp(app.appId, {lastreviewId: authors[0].id.label});
													this.appsProvider
														.updateApp(app.appId, {last_review_ids: review_ids});
												}
											}
										}
									})
									.catch((err) => {
										console.log(err);
									});
							});
						}
					});
			});
	}

	_messageFactory(chat_id, message) {
		return this.telegram
			.sendMessage({
				chat_id: chat_id,
				text: message,
				parse_mode: 'Markdown'
			});
	}

	_chainPromises(list) {
		if (list && list.length > 0) {
			list.reduce((prev, current) => {
				prev.fn(prev.chat_id, prev.message).then((res) => {
					console.log("executing : " + current.message);
					return current.fn(current.chat_id, current.message);
				});
				return current;
			});
		}
	}
}