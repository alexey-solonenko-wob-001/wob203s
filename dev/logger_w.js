//const winston = require('winston');
import winston from 'winston';
import { createRequire } from 'module';
import filename from '../src/filename.cjs';
const logger = winston.createLogger({
    'level': 'debug',
    defaultMeta: { service: 'user-servive' },
    transports: [
        new winston.transports.Console(
            { format: winston.format.simple() })
    ]
});
console.log('test from logger');
//module.exports = {};
export default logger;