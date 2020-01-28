const path = require('path');
const exec = require('child_process').exec;
//const merge = require('webpack-merge');
//const baseConfig = require('./webpack.base.js');
//const webpackNodeExternals = require('webpack-node-externals');
console.log(path.resolve(__dirname,'./node_modules/'));
const config = {
    target: 'node',
    node: {
        __dirname: false,
        __filename: false,
    },
    mode: 'development',
    /* inform webpack that we'are building a bundle for nodeJS, rather than for the browser  */
    

    /* tell webpack the root fiel of our server application */
    //entry: path.resolve(__dirname,'./src/index.js'),
    entry: path.resolve(__dirname,'./index.mjs'),

    /* Tell webpack where to put the output file that is generated */
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './build')
    },
    //externals: [webpackNodeExternals()],
    externals:['child_process'],
    module: {
        rules: [
            {
                test: /\.m?js?$/,
                loader: 'babel-loader',
                exclude: path.resolve(__dirname,'../node_modules/'),
                //exclude: '/node_modules/',
                options: {
                    presets: [
                        [
                            '@babel/env',
                            {
                                targets: {
                                    browsers: [
                                        'last 2 versions'
                                    ]
                                }
                            }
                        ]
                    ]
                }
            }
        ]
    },
    plugins:[
        {apply: (compiler) => {
            compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
              exec('node --experimental-modules ftp.deploy.dev.bundle.mjs', (err, stdout, stderr) => {
                if (stdout) process.stdout.write(stdout);
                if (stderr) process.stderr.write(stderr);
              });
              exec('title SERVER',(err, stdout, stderr) => {
                if (stdout) process.stdout.write(stdout);
                if (stderr) process.stderr.write(stderr);
              });
              
            });
          }
        }
    ]
};
// module.exports = merge(baseConfig, config);
module.exports = config;