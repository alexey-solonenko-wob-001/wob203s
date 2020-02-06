import filename from './src/filename.cjs';
import { createRequire } from 'module';
const require = createRequire(filename);
const Client = require('ftp');
import fs from 'fs';
import util from 'util';

/* Logger in dev folder is setup for package-scope use only, 
so we cannot reuse it here (we need to make it an *.mjs file */
/* Thus, let's create a custom logger here */
import winston from 'winston';
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    defaultMeta: { service: 'user-servic', date: new Date() },
    transports: [
        new winston.transports.File({ filename: './tmp/wob203s.log' })
    ]
});
const pReadFile = util.promisify(fs.readFile);


/**
 * 
 * @param filePaths
 * @returns {Array<Promise|null>} 
 */
const readFiles = async (filePaths) => {
    if (!Array.isArray(filePaths)) filePaths = [filePaths];
    return filePaths.map(async filePath => {
        let contents;
        try {
            contents = await pReadFile(filePath);
        } catch (e) {
            throw new Error('File reading failed. ' + e.toString());
        }
        return ({ contents, path: filePath });
    })
};


/**
 * @function deployFiles
 * 
 * @returns {Array<Promise>}
 */
const deployFiles = (props, ftpConnection) => {
    if (!Array.isArray(props)) props = [props];

    const promiseToPut = ((props, ftpConnection) => {
        let { contents, path } = props;
        return new Promise((resolve, reject) => {
            try {
                path = 'public_html/' + path;
                ftpConnection.put(contents, path, (err => {
                    if (!err) {
                        resolve();
                    }
                    else {
                        reject(err);
                    }
                }));
            } catch (e) {
                reject(e);
            }
        });
    });

    return props.map(prop => promiseToPut(prop, ftpConnection));
};

const deployFilesSequentially = async filePaths => {
    try {
        const ftpConnection = await openConnection();
        const contentsPromises = await readFiles(filePaths);
        const contents = await Promise.all(contentsPromises);
        await Promise.all(deployFiles(contents, ftpConnection));
        ftpConnection.end();
    } catch (e) {
        /**
         * @todo to update logger with differen levels
         */
        logger.info(e);
    }
};

const filePaths = [
    './tmp/restart.txt',
    './build/bundle.js',
];

const openConnection = () => new Promise((resolve, reject) => {
    try {
        var c = new Client();
        c.on('ready', resolve.bind(null, c));
        c.on('error', reject.bind(null, c));
        const config = {
            host: 'tab4lioz.beget.tech',
            user: 'tab4lioz_testapi',
            password: 'Bravo2Alpha1!',
        };
        c.connect(config);
    }
    catch (e) {
        reject(e);
    }
});

(async () => {
    await deployFilesSequentially(filePaths);
    console.log('server app files deployed to the remote')
    process.exit(1);
})();