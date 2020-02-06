import path from 'path';
import http from 'http';
import cors from 'cors';
import filename from './src/filename.cjs';
import { logger } from './dev/logger_w.js';
import test_ecma_module from './src/test_ecma_module.js';
import express from 'express';
import { paths } from './src/mocks/paths/paths.js';
import { routes } from './src/mocks/routes/routes.js';
import viewParams from './src/mocks/viewParams/viewParams.js';

import { loginRouteHanlder } from './src/routeHandlers/login.js';

/* Study Middleware Routers */
import { studyGeneratorRouter } from './src/middleware-study/generators/study-generator.js';
import { usersMiniApp } from './src/middleware-express-routers/users-mini-app/users-mini-app.js';


const app = express();
const port = process.env.port || 3001;

app.use('/study/generators/',studyGeneratorRouter);
app.use('/users/',usersMiniApp);

app.get('/', (req, res) => {

    res.send('Hello world from express 3');
}
);
console.log('from index.mjs');
logger.info('test from index.mjs 2');

import passport from 'passport';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

app.use(passport.initialize());
app.use(bodyParser.raw());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

app.post('/login/',loginRouteHanlder);

let allowedOrigins = [
    'http://localhost:3000',
    'http://debug.tab4lioz.beget.tech/',
];

app.use((req,res,next) => {
    let requestPath = req.protocol + '://' + req.hostname;
    console.log(requestPath);
    logger.info(requestPath);
});

app.all('/login2',cors({origin:'http://localhost:3000','credentials':true}),(req,res,next) => {
    
    console.log(req.hostname,req.originalUrl,req.path);
    console.log('cookie',req.cookies);
    console.log('login2',req.body, req.query,req.params);
    res.cookie('test','test');
    res.json({test:'test'});
    res.end();
});


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