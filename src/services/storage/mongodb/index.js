import MongoClient from 'mongodb';
import AppsProvider from './apps-provider';
import UserProvider from './user-provider';

export default class StorageProvider {

  constructor() {

  }

  connect(config) {
    if (!config.mongo.uri) {
      throw Error("MongoDB connection not configured, set MONGO_URI env variable");
    }

    return new Promise((resolve, reject) => {
      MongoClient.connect(config.mongo.uri, (err, db) => {
        if (err) {
          reject(err);
        }

        this.db = db;
        console.log('Connected correctly to server');

        this._appsProvider = new AppsProvider(this.db);
        this._usersProvider = new UserProvider(this.db);

        resolve(db);
      });
    });
  }

  get appsProvider() {
    return this._appsProvider;
  }

  get usersProvider() {
    return this._usersProvider;
  }
}
