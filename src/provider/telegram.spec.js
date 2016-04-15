'use strict';

import Promise from 'bluebird';
import chai from 'chai';
import TelegramBot from './telegram';
import nock from 'nock';

// Tell chai that we'll be using the "should" style assertions.
chai.should();

describe('TelegramBot', () => {
  let telegram;

  beforeEach(() => {
    const request = Promise.promisify(require('request'));
    telegram = new TelegramBot(request, '219358172:AAG7Fiy-CYxBdKZIoyjnuxCzjJ6440diD5g');


  });

  it('Should get updates', function (done) {
    let offset = 0, limit = 10, timeout = 2000;

    nock('https://api.telegram.org')
      .get(/bot.*\/getUpdates/)
      .replyWithFile(200, __dirname + '/fixtures/telegram-getupdates.json');

    telegram.getUpdates(offset, limit, timeout)
      .then((res) => {
        res.should.to.be.instanceOf(Object);
        res.should.to.have.property('result').and.length.above(1);
        done();
      });
  });

  it('Should get info about me', function (done) {

    nock('https://api.telegram.org')
      .get(/bot.*\/getMe/)
      .replyWithFile(200, __dirname + '/fixtures/telegram-getme.json');

    telegram.getMe()
      .then((res) => {
        res.should.to.be.instanceOf(Object);
        res.should.to.have.property('ok')
          .and.equal(true);
        res.should.to.have.property('result')
          .and.have.property('first_name')
          .and.equal('AppReviewBot');

        done();
      });
  });

});

