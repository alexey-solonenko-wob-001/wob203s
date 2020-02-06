import { userTypes } from '../../consts/user-types.js';
import connectionData from '../../../secrets/mysql-connection.js';
import fs from 'fs';
import merge from 'lodash.merge';
import mysql from 'mysql2';
import util from 'util';
const pReadFile = util.promisify(fs.readFile);

import { logger } from '../../../dev/logger_w.js';

logger.info('in insert user logger 2');

(async () =>{
    try{
        logger.info('trying reading file');
        const connectionConfJson = await pReadFile('./build/secrets/mysql-connection.json');
        logger.info(JSON.stringify(connectionConfJson));
    } catch(e){
        logger.info(e.toString());
    }
})();

const connData = merge({}, connectionData);
console.log('in  insert user ');
const insertUser = [
    (req, res, next) => {
        console.log('handling insert user request ');
        console.log(connData);
        logger.info(JSON.stringify(connData));
        const connection = mysql.createConnection(connData);
        connection.connect((err => {
            if (err) {
                console.log('error connecting' + err.stack);
                logger.info('error connecting' + err.stack)
                next(err);
            }
            console.log('connected as id' + connection.threadId);
            next();
        }))
    },
];

export { insertUser };


