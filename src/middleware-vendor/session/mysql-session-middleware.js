import fs from 'fs';
import path from 'path';
import session from 'express-session';
import StoreFactory from 'express-mysql-session';
import util from 'util';


const pReadFile = util.promisify(fs.readFile);
let configFilePath = path.resolve('./secrets/mysql-connection.json');
let cookieSecretPath = path.resolve('./secrets/cookie-secret.json');
const MySQLStore = StoreFactory(session);

const getMySqlSessionOpts = async () => {
    /* MySQL Session Store */
    const confJson = await pReadFile(configFilePath);
    const conf = JSON.parse(confJson.toString());
    conf.schema = {
        tableName: 'user_login_sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    };
    conf.clearExpired = false;
    let sessionStore = new MySQLStore(conf);

    /* Express Session */
    const cookieSecretJson = await pReadFile(cookieSecretPath);
    const cookieSecret = JSON.parse(cookieSecretJson.toString());
    console.log('cookie secret',cookieSecret)
    const sessionOpts = {
        store: sessionStore,
        secret: cookieSecret.cookieSecret,
        resave: false,
        key:'wob203s.sid.uid.whatever',
        saveUninitialized: true,
        // cookie: {
        //     secure: true
        // }
        name: 'wob203s.sid',
        //httpOnly:false,
    };

    return sessionOpts;
};

export { getMySqlSessionOpts };



