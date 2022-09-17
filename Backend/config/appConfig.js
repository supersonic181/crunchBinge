// configuration of server and the database
const serverConfig = {
    port: 5000,
    hostname: "127.0.0.1"
}

const dbConfig = {
    mongoUrl: "mongodb://0.0.0.0:27017/crunchBingeDB"
}

const key = require('dotenv').config();

module.exports = {
    serverConfig,
    dbConfig,
    key
}