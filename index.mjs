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

import passport from 'passport';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import { getMySqlSessionOpts } from './src/middleware-vendor/session/mysql-session-middleware.js';

(async () => {
    try {
        logger.info('starting on index.mjs');
        const app = express();
        const port = process.env.port || 3001;

        /* Middleware- Vendor */
        app.use(bodyParser.raw());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cookieParser());
        const sessionOpts = await getMySqlSessionOpts();
        app.use(session(sessionOpts));
        app.use(passport.initialize());
        app.use(passport.session());


        app.use((req, res, next) => {
            console.log('session', req.session);
            console.log('session id', req.sessionID);
            next();
        });

        /* Middleware Express Routers  */
        app.use('/study/generators/', studyGeneratorRouter);
        app.use('/users/', usersMiniApp);

        
        /* TODO to make a final fall back NOT FOUND route handler  */

        app.get('/', (req, res) => {
            if (req.session.views) {
                req.session.views++;
            } else {
                req.session.views = 1;
            }
            res.send('Hello world from express 3. You viewed this page ' + req.session.views + ' times');
        });

        app.post('/login/', loginRouteHanlder);

        let allowedOrigins = [
            'http://localhost:3000',
            'http://localhost:3001',
            'http://127.0.0.1:3000',
            'http://127.0.0.1:3001',
            'http://debug.tab4lioz.beget.tech/',
        ];

        app.use((req, res, next) => {
            let requestPath = req.protocol + '://' + req.hostname;
            console.log(requestPath);
            logger.info(requestPath);
            next();
        });

        app.all('/login2', cors({ origin: allowedOrigins, 'credentials': true }), (req, res, next) => {
            console.log('login2', req.body, req.query, req.params);
            console.log(req.hostname, req.originalUrl, req.path);
            console.log('cookie', req.cookies);
            console.log('login2', req.body, req.query, req.params);
            //res.cookie('test','test');
            res.json({ test: 'test' });
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

        app.listen(port, 'localhost', 511,
            () => console.log('Express  listening on ' + port));
    } catch (e) {
        logger.info(e.message);
    }
})();

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