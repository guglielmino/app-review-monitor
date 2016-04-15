/**
 * Created by fabrizio on 30/03/16.
 */

import AsyncPolling from 'async-polling';

class Scheduler {

  schedule(func, delay) {
    if (!this.polling) {
      this.polling = AsyncPolling((end) => {
        func();
        end();
      }, delay);
      this.polling.run();
    }
  }

  start() {
    if (this.polling) {
      this.polling.run();
    }
  }

  stop() {
    if (this.polling){
      this.polling.stop();
    }
  }

}

module.exports = Scheduler;