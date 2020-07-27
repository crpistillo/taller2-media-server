const winston = require('winston')

// Logger configuration

const config = {
    levels: {
        error: 0,
        debug: 1,
        info: 2,
    },
    colors: {
        error: 'red',
        debug: 'blue',
        info: 'green',
    }
};

const fileLogConfiguration = {
    levels: config.levels,
    transports: [
        new winston.transports.File({
            filename: './log/logs.log',
            options: { flags: 'w' }
        }),
    ],

    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple(),
        winston.format.printf((info) => {
            return `${info.timestamp} - [${info.level}]: ${info.message}`;
        }),
    )
};

const consoleLogConfiguration = {
    levels: config.levels,
    transports: [
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true,
        })
    ],

    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.simple(),
        winston.format.printf((info) => {
            return `${info.timestamp} - [${info.level}]: ${info.message}`;
        }),
    )
};

if(process.env.TESTING == 'true')
    module.exports = winston.createLogger(fileLogConfiguration);
else{
    winston.addColors(config.colors);
    module.exports = winston.createLogger(consoleLogConfiguration);
}

