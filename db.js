const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('./database/db.json');
const db = low(adapter);

db.defaults({ employee_key: [] }, { employee_info: [] }, { employee_Time: [] }, { users: [] })
    .write()

module.exports = db;