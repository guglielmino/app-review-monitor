'use strict';

import logger from './services/logger';
import Koa from 'koa';
import config from './config';
import Promise from 'bluebird';
import Scheduler from './provider/scheduler';
import Telegram from './provider/telegram';
import TelegramChatter from './provider/telegramchatter';
import Scraper from './provider/scraper';

// Commands
import StartCommand from './commands/start-cmd';
import SearchCommand from './commands/search-cmd';
import AddCommand from './commands/add-cmd';
import RemoveCommand from './commands/remove-cmd';
import ListCommand from './commands/list-cmd';
import LangCommand from './commands/lang-cmd';

import StorageProvider from './services/storage/mongodb';
import StoreManager from './services/domain/store-manager';

const app = new Koa();

const request = Promise.promisify(require('request'));
const telegram = new Telegram(request, config.telegram.api_key);
const scraper = new Scraper(request);
const storageProvider = new StorageProvider(config);

(async() => {
  app.listen(config.server.port, () => {
    logger.info(`App started on port ${config.server.port} with environment ${config.env}`);
  });
})();

storageProvider
  .connect(config)
  .then((db) => {

    const sched = new Scheduler();
    const chatter = new TelegramChatter();

    const startCommand = new StartCommand(telegram, storageProvider.usersProvider);
    const searchCommand = new SearchCommand(telegram, scraper);
    const addCommand = new AddCommand(telegram, storageProvider.appsProvider);
    const removeCommand = new RemoveCommand(telegram, storageProvider.appsProvider);
    const listCommand = new ListCommand(telegram, storageProvider.appsProvider);
    const langCommand = new LangCommand(telegram, storageProvider.usersProvider);

    chatter.addCommand('/start', startCommand);
    chatter.addCommand('/search', searchCommand);
    chatter.addCommand('/add', addCommand);
    chatter.addCommand('/remove', removeCommand);
    chatter.addCommand('/list', listCommand);
    chatter.addCommand('/lang', langCommand);

    let lastupdateId = 0;

    if (!config.telegram.webhook_url) {
      sched.schedule(() => {
        telegram.getUpdates(lastupdateId, 100, 1000)
          .then((res) => {
            lastupdateId = chatter.processRequest(res);
          });
      }, 1000);
    }
    else {
      logger.debug("WebHook");
      //telegram.setWebhook('')
    }

    const storeManager = new StoreManager(storageProvider.appsProvider, scraper, telegram);
    storeManager.start();
  });

export default app;