const logger = require('./logger');
//Read enviornment variables
console.log("Config loading ::::::::::::", process.env.NODE_ENV);

const dotenv = require('dotenv');
let result = dotenv.config();

if (result.error) {
    throw result.error;
}

const { parsed: env } = result;
let environment = process.env;
logger.log("HOSTNAME+++++++++++", environment.MONGO_HOSTNAME)
console.log("HOSTNAME====", environment.MONGO_HOSTNAME);
console.log("MONGO_DB:", environment.MONGO_DB);
console.log("MONGO_USERNAME:", environment.MONGO_USERNAME);
console.log("MONGO_PASSWORD:", environment.MONGO_PASSWORD);
console.log("MONGO_HOSTNAME:", environment.MONGO_HOSTNAME);
console.log("MONGO_PORT:", environment.MONGO_PORT);
console.log("MONGODB_URI:", environment.MONGODB_URI);
//Application PORT
console.log(" PORT:", environment.PORT);
console.log("JWT_SECRET:", environment.JWT_SECRET);
console.log("COMMUNICATION_APP_LOCAL:", environment.COMMUNICATION_APP_LOCAL);
logger.log("MONGO_DB:", environment.MONGO_DB)
logger.log("MONGO_USERNAME:", environment.MONGO_USERNAME)
logger.log("MONGO_PASSWORD:", environment.MONGO_PASSWORD)
logger.log("MONGO_HOSTNAME:", environment.MONGO_HOSTNAME)
logger.log("MONGO_PORT:", environment.MONGO_PORT)
logger.log("MONGODB_URI:", environment.MONGODB_URI)
//Application PORT
logger.log(" PORT:", environment.PORT)
logger.log("JWT_SECRET:", environment.JWT_SECRET)
logger.log("COMMUNICATION_APP_LOCAL:", environment.COMMUNICATION_APP_LOCAL)

module.exports = {
    //Mongo database setup
    MONGO_DB: environment.MONGO_DB,
    MONGO_USERNAME: environment.MONGO_USERNAME,
    MONGO_PASSWORD: environment.MONGO_PASSWORD,
    MONGO_HOSTNAME: environment.MONGO_HOSTNAME,
    MONGO_PORT: environment.MONGO_PORT,
    MONGODB_URI: environment.MONGODB_URI,
    //Application PORT
    PORT: environment.PORT,
    JWT_SECRET: environment.JWT_SECRET,
    COMMUNICATION_APP_LOCAL: environment.COMMUNICATION_APP_LOCAL
};



