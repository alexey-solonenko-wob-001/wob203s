import crypto from 'crypto';
import { logger } from '../../../dev/logger_w.js';
import merge from 'lodash.merge';
import { escape } from 'mysql2';

import { getPromisePool } from '../../mysql/connection/get-promise-pool.js';

const insertUser = [
    async (req, res, next) => {
        const pool = await getPromisePool();
        const connection = await pool.getConnection();
        /* To add username validation in a separate middleware? */
        let params = merge({}, req.body, req.query);
        if (!params.username) {
            logger.info('username not found in req.body nor query', params);
            next();
        }
        if (!params.password) {
            logger.info('password not found in req.body nor query', params);
            next();
        }
        let salt = crypto.randomBytes(32).toString('hex');
        let hash = crypto.pbkdf2Sync(params.password, salt, 10000, 64, 'sha512').toString('hex');
        let { username, userType } = {
            username: escape(params.username),
            userType: 5,
        }
        try {
            const [ret] = await connection.execute(`INSERT INTO users (username, userType, hash, salt) VALUES(${username},${userType},'${hash}','${salt}')`);
            if (ret.affectedRows < 1) {
                next('Error adding new users');
            }
        } catch (err) {
            logger.info('error connecting' + err.stack);
            next(err);
        }
        next();
    },
];

export { insertUser };


