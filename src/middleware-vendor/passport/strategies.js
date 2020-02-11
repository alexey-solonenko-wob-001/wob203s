import { userErrors } from '../../errors/user-errors.js';
import crypto from 'crypto';
import { getPromisePool } from '../../mysql/connection/get-promise-pool.js';
import { escape } from 'mysql2';
import { logger } from '../../../dev/logger_w.js';
import passport from 'passport';
import passportLocal from 'passport-local';
import { validPassword } from '../../utils/password.js';


const fakeDb = {
    'user1':'user1',
    'user2':'user2',
};

const LocalStrategy = passportLocal.Strategy;

const localUserLoginStrategy = new LocalStrategy(
    /* 
    Username and password query/params/body names can be changed during passport init 
    Otherwise they are default.
    This function argument names inherit the defaults.
    */
    async function(username, password, done) {
        const pool = await getPromisePool();
        const connection = await pool.getConnection();
        const [rows,fields] = await connection.execute(`SELCT * from users where username = '${username}'`);
        if(rows.length < 1) {
            done(userErrors.userNotFound);
        }
        let user = rows[0];
        if(!validPassword(password,user.hash,user.salt)){
            done(userErrors.userPasswordIsInvalid);
        }
        var hashVerify = crypto.pbkdf2Sync(password, user.salt, 10000, 64, 'sha512').toString('hex');

        try {
            username = escape(username);
            password = escape(password);
            const [rows, fields] = await connection.execute(`SELECT *, ${username} FROM users`);
            console.log('rows : ', rows);
        } catch (err) {
            console.log('error connecting' + err.stack);
            logger.info('error connecting' + err.stack);
            done(err);
        }

        console.log('strategy verify callback is called',username,password);
        if(!fakeDb[username]) return done(null,false,{message:'User not found'});
        if(fakeDb[username] !== password) return done(null,false,{message:'Wrong password'});
        return done(null,{username});
    }
  );

  export { localUserLoginStrategy };