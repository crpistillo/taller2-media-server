const winston = require('winston')

// Logger configuration


const logConfiguration = {
    levels: {
        debug: 0,
        info: 1,
        error: 2
    },

    transports: [
        new winston.transports.File({
            filename: './log/logs.log',
            options: { flags: 'w' }
        })
    ],

    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple(),
        winston.format.printf((info) => {
            return `${info.timestamp} - [${info.level}]: ${info.message}`;
        })
    )
};

module.exports = winston.createLogger(logConfiguration);;