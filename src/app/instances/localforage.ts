import localforage from 'localforage';

const dbName = 'comicdb';

// Create table 1 in databaseName
const thumbnail = localforage.createInstance({
  name: dbName,
  storeName: 'thumbnail',
});
