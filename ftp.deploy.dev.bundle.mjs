// var Client = require('ftp');
// const path = require('path');
// const fs = require('fs');
import path from 'path';
import filename from './src/filename.cjs';
import { createRequire } from 'module';
const require = createRequire(filename);
const Client = require('ftp');

import fs from 'fs';
//const Client = ftp.Client;
//console.log(process.env);
import logger from './dev/logger_w.js';

//const filePath = path.resolve(__dirname, './bundle/bundle.js');
const rdFile = (filename) => new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
        if (err) throw err;
        setTimeout(resolve.bind(null, ({ data, path: 'public_html/' + path.parse(filename).base.toString() })), 2000);
    });
});

const openConnection = () => new Promise((resolve, reject) => {
    var c = new Client();
    c.on('ready', resolve.bind(null, c));
    const config = {
        host: 'tab4lioz.beget.tech',
        user: 'tab4lioz_testapi',
        password: 'Bravo2Alpha1!',
    };
    c.connect(config);
});

const putBundle = ({ data, path }, c) => new Promise((resolve, reject) => {
    console.log(data);
    console.log(path);
    c.put(data, 'public_html/bundle.js', (err) => {
        c.put('1340', 'public_html/test.txt', (err) => {
            console.log(err);
            console.log(path);
            //console.log(c);
            console.log(data);
            c.end();
            console.log('upload completed');
            resolve();
            if (err) throw err;
        });
        console.log(err);
        if (err) throw err;
    });
});

const putBundle2 = async (data, con) => {

    const makePutPromise = ({ data, path }) =>
        new Promise((resolve, reject) => {
            console.log('calling promise');
            con.put(data, path, (err) => {
                console.log('single put completed');
                setTimeout(() => { resolve(); }, 2000);
                if (err) reject(err);
            });
        });


    //const putPromises = data.map(makePutPromise);
    //console.log(putPromises);
    const unused = await Promise.all(data.map(makePutPromise));
    //const unused = await Promise.all([(async() => await makePutPromise(data[0]))()]);
    // const unused = await Promise.all([ makePutPromise(data[0])]);

    // const unused = await (async () => {
    //     await data.map(makePutPromise).reduce((acc, val) => {
    //         //console.log(arguments);
    //         return acc.then(val);
    //     }, Promise.resolve());
    // })();

    // for await (const piece of data){
    //     let pr = await makePutPromise(piece);
    //     console.log(pr);
    //     console.log('completed iteration');
    // }

    //con.end();
    //console.log(unused);
    console.log('upload completed');
    //return;
};

(async () => {
    try {
        const res = await Promise.all([rdFile('./build/bundle.js'), openConnection()]);
        console.log('received connection from promise all ');
        //putBundle(...res);
        const a = await putBundle2([res[0]], res[1]).
            then((ok, err) => {
                console.log('closing');
                res[1].end()
            });
        console.log('after put bundle');
        console.log(a);
    } catch (e) {
        console.log(e);
    }
})();
console.log('end of script');


// (async () => {
//     const fileContents = await readFile();
//     c.on('ready', function () {
//         c.put('./build/bunlde.js', 'public_html/bundle.js', function (err) {
//             if (err) {
//                 console.log(err);
//             }
//             c.end();
//         });
//     });
//     // connect to localhost:21 as anonymous
//     const config = {
//         host: 'tab4lioz.beget.tech',
//         user: 'tab4lioz_testapi',
//         password: 'Bravo2Alpha1!',
//     };

//     console.log('trying connecting');
//     c.connect(config);
// })();