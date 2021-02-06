const mongoose = require('mongoose');
const config = require('./config');
const logger = require('./logger')


let url = '';

console.log("process.env.NODE_ENV ::::::::::::", process.env.NODE_ENV);
const MONGO_USERNAME = config.MONGO_USERNAME;
const MONGO_PASSWORD = config.MONGO_PASSWORD;
const MONGO_HOSTNAME = config.MONGO_HOSTNAME;
console.log(MONGO_HOSTNAME);
const MONGO_PORT = config.MONGO_PORT;
const MONGO_DB = config.MONGO_DB;
devUrl = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authMechanism=SCRAM-SHA-1`;
// devUrl = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
mongoose.connect(devUrl, { useNewUrlParser: true, useUnifiedTopology: true });
console.log("Database db URL::::::::::::", devUrl);
logger.log("Database db URL::::::::::::", devUrl)
mongoose.Promise = global.Promise;

db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('open', () => {
    console.log('DB Connection established successfully');
});
// Added check for DB connection
if (!db)
    console.log("Error connecting db");
else {
    console.log("Db connected successfully");
}
