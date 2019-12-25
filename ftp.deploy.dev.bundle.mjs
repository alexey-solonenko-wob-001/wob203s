import filename from './src/filename.cjs';
import { createRequire } from 'module';
const require = createRequire(filename);
const Client = require('ftp');
import fs from 'fs';
import util from 'util';
import { logger } from './dev/logger_w.mjs';

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
    process.exit(1);
})();