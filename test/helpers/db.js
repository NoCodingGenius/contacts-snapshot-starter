process.env.DATABASE_URL = 'postgres://localhost:5432/contacts_test';
const db = require('../../src/models/db/db.js');
const QueryFile = require('pg-promise').QueryFile;
const path = require('path');

function sql(file) {
  const fullPath = path.join(__dirname, file);
  return new QueryFile(fullPath);
}

const seedFiles = {contacts: sql('../seed/contacts.sql')}

const truncateDB = () => {
  const tables = ['contacts'];
  return Promise.all(tables.map((table) => {
    return db.none(`TRUNCATE ${table} RESTART IDENTITY`);
  }))
}

const seedDB = () => {
  return db.none(seedFiles.contacts)
}

const initDB = () => {
  return truncateDB().then(() => {
    return seedDB();
  });
}

module.exports = {
  truncateDB,
  initDB
}
