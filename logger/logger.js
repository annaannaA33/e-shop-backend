const winston = require("winston");
const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "error.log", level: "error" }),
    ],
});

module.exports = logger;
/*
const winston = require("winston");
const logger = winston.createLogger({
    level: "debug",
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "debug.log", level: "debug" }),
        new winston.transports.File({ filename: "info.log", level: "info" }),
        new winston.transports.File({ filename: "warn.log", level: "warn" }),

        new winston.transports.File({ filename: "error.log", level: "error" }),
    ],
});

// Function for switching logging level
function setLogLevel(level) {
    logger.level = level;
}
module.exports = { logger, setLogLevel };
*/
