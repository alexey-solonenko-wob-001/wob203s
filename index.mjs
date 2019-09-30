import path from 'path';
import http from 'http';
import filename from './src/filename.cjs';
import test_ecma_module from './src/test_ecma_module.js';
import express from 'express';
import { paths } from './src/mocks/paths/paths.js';
import { routes } from './src/mocks/routes/routes.js';
import viewParams from './src/mocks/viewParams/viewParams.js';
const app = express();
const port = process.env.port || 3001;
//port =  3001;
app.get('/for', (req, res) => {
    console.log('startig processing for request');
    const genFactory = function* () {
        for (let i = 0; i < 10e7; i++) {
            if (i % 1000000 === 0) console.log('processing for: ' + i);
            yield i;
        }
    }
    const gen = genFactory();
    const forHandler = function () {
        let i = gen.next().value;
        if (i > (10e6 - 2)) {
            res.send('Long processing of for completed ');
            return;
        } else {
            setImmediate(forHandler);
        }
    }
    forHandler();

}
);


const asyncToHandler = async () => {


    const forHandler = () => new Promise((resolve, reject) => {
        const genFactory = function* () {
            for (let i = 0; i < 10e7; i++) {
                if (i % 100000 === 0) console.log('processing  to: ' + i);
                yield i;
            }
        }

        const gen = genFactory();
        const promiseHandler = () => {
            let i = gen.next().value;
            if (i > (10e5 - 2)) {
                console.log('processing completed');
                resolve();
            } else {
                setImmediate(promiseHandler);
            }
        };
        promiseHandler();
    });
    // await forHandler();
    // await forHandler();
    // await forHandler();
    await Promise.all(Array(3).fill({}).map(forHandler));
};

app.get('/to', async (req, res) => {
    console.log('startig processing to request');
    console.log(asyncToHandler);
    await asyncToHandler();
    console.log('request processed');

    res.send('Long processing of to completed ');

}
);

app.get('/', (req, res) => {

    res.send('Hello world from express');
}
);
console.log('from index.mjs');

app.get('/fetch_paths', (req, res) => {
    console.log('fetching paths');
    res.send(JSON.stringify({ payload: { data: paths } }));
    res.end();
});

app.get('/fetch_routes', (req, res) => {
    console.log('fetching routes');
    /** 
     * @typedef import('../../typedefs/navTypeDefs.js').wob203rRoutes 
     */
    let allowedRoutes = routes;

    res.send(JSON.stringify({ payload: { data: allowedRoutes } }));
    res.end();
});

app.get('/fetch_view_params', (req, res) => {
    console.log('fetching view params');
    res.send(JSON.stringify({ payload: { data: viewParams } }));
    res.end();
});

app.listen(port, () => console.log('Express  listening on ' + port));
//const http = require('http');
//const path = require('path');

// const hostname = '127.0.0.1';
// const port = 3000;
// console.log('rebuild 1');
// // console.log(__dirname);
// // console.log(__filename);
// //console.log(path.resolve(__dirname,""));
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World 1232\n');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });