'use strict';

import Promise from 'bluebird';
import chai from 'chai';
import Scraper from './scraper';


// Tell chai that we'll be using the "should" style assertions.
chai.should();

describe('Scraper', () => {
  let scraper;

  beforeEach(() => {
    const request = Promise.promisify(require('request'));
    scraper = new Scraper(request);
  });

  it('Should get info on App id 423351630', function (done) {

     scraper.getByAppId('it', 423351630)
            .then((res) => {

              res.should.to.be.instanceof(Array);
              res.should.to.have.length.above(1);
              res[0].should.to.have.property('title');

              done();
            });
  });

  it('Should get search resoult for app "Facebook"', function (done) {

    scraper.searchApp('facebook')
      .then((res) => {

        res.should.to.have.property('resultCount');
        res.should.to.have.property('results');

        done();
      });
  });
});
