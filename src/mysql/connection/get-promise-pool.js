import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import util from 'util';

const pReadFile = util.promisify(fs.readFile);
let configFilePath = path.resolve('./secrets/mysql-connection.json');

const MYSQL_PROMISE_POOL_KEY = Symbol.for("wob203s.mysql_promise_pool");

let getPromisePool = async () => {
    var globalSymbols = Object.getOwnPropertySymbols(global);
    var hasPool = (globalSymbols.indexOf(MYSQL_PROMISE_POOL_KEY) > -1);
    if (!hasPool) {
        const connectionConfJson = await pReadFile(configFilePath);
        const connectionConf = JSON.parse(connectionConfJson.toString());
        connectionConf.connectionLimit = 15;
        connectionConf.namedPlaceholders = true;
        global[MYSQL_PROMISE_POOL_KEY] = mysql.createPool(connectionConf);
        return global[MYSQL_PROMISE_POOL_KEY];
    } else {
        return global[MYSQL_PROMISE_POOL_KEY];
    }
}
Object.freeze(getPromisePool);

export { getPromisePool };