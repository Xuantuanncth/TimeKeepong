const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('./database/db.json');
const db = low(adapter);

db.defaults({ deviceStatus: [] }, { deviceRanger: [] }, { users: [] }, { settingTime: [] }, { dataSensor: [] })
    .write()

module.exports = db;