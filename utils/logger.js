const winston = require('winston');
const path = require('path');
const config = require('../config.js');

class Logger {
    constructor() {
        this.logger = winston.createLogger({
            level: config.logging.level,
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.errors({ stack: true }),
                winston.format.json()
            ),
            defaultMeta: { service: 'warhammer-bot' },
            transports: [
                new winston.transports.File({
                    filename: path.join(config.logging.directory, 'error.log'),
                    level: 'error'
                }),
                new winston.transports.File({
                    filename: path.join(config.logging.directory, 'combined.log')
                }),
                new winston.transports.Console({
                    format: winston.format.simple()
                })
            ]
        });
    }

    info(message, meta = {}) {
        this.logger.info(message, meta);
    }

    error(message, error = null) {
        this.logger.error(message, { error: error?.stack || error });
    }

    warn(message, meta = {}) {
        this.logger.warn(message, meta);
    }

    debug(message, meta = {}) {
        this.logger.debug(message, meta);
    }
}

module.exports = Logger;
