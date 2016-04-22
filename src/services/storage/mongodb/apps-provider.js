const COLLECTION_NAME = 'apps';

export default class AppsProvider {
  constructor(db) {
    this.db = db;
    this.db.collection(COLLECTION_NAME, (err, col) => {
      col.createIndex({appId: 1, username: 1}, {w: 1, unique: true});
    });
  }

  save(appData) {
    return new Promise((resolve, reject) => {
      this.db.collection(COLLECTION_NAME, (err, col) => {
        if (err) {
          reject(err);
        }

        col.insertOne(appData, (err, r) => {
          if (err) {
            reject(err);
          } else {
            resolve(r.insertedCount);
          }
        });
      });
    });
  }

  getApps(username) {
    return new Promise((resolve, reject) => {
      this.db.collection(COLLECTION_NAME, (err, col) => {
        col.find({ username: username }).toArray((err, docs) => {
          if (err) {
            reject(err);
          } else {
            resolve(docs);
          }
        });
      });
    });
  }

  getAllApps() {
    return new Promise((resolve, reject) => {
      this.db.collection(COLLECTION_NAME, (err, col) => {
        col.find({}).toArray((err, docs) => {
          if (err) {
            reject(err);
          } else {
            resolve(docs);
          }
        });
      });
    });
  }

  remove(data) {
    return new Promise((resolve, reject) => {
      this.db.collection(COLLECTION_NAME, (err, col) => {
        if (err) {
          reject(err);
        }

        col.remove({ username: data.username, appId: data.appId }, {safe: true}, (error, res) => {

          if (error) {
            reject(error);
          } else {
            resolve(res);
          }

        });
      });
    });
  }

  updateApp(appId, updates) {
    return new Promise((resolve, reject) => {
      this.db.collection(COLLECTION_NAME, (err, col) => {
        if (err) {
          reject(err);
        }

        col.updateOne({ appId: appId},
          { $set: updates },
          (err, r) => {
          if (err) {
            reject(err);
          } else {
            resolve(r);
          }
        });
      });
    });
  }
}
