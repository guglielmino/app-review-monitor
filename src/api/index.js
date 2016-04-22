/**
 * Created by fabrizio on 22/04/16.
 */

'use strict';

import Router from 'koa-router';
import convert from 'koa-convert';
import bodyParser from 'koa-bodyparser';
import telegramRoutes from './telegram.route';

export default (app, chatter, logger) => {
	app.use(convert(bodyParser()));

	const router = new Router({
		prefix: '/api'
	});

	telegramRoutes(router, chatter, logger);

	app.use(router.routes());

};