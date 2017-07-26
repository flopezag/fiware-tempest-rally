#!/usr/bin/env nodejs

/**
 * Module dependencies.
 */

const express = require('express');
const fs = require('fs');
const executionTime = require('./executionTime');

/**
 * Set working directory...
 */
process.chdir(__dirname+"/..");

/**
 *
 */
const config = require('../cfg/config');

const app = express();

// No need to cache
// var cache

app.use('/public', express.static('public'));

app.get('/', function (req, res) {
    res.contentType('text/html');
    res.writeHead(200);
    res.end( fs.readFileSync( 'public/index.html' ));
});

app.get('/region', function (req, res) {
    res.contentType('application/json');
    res.writeHead(200);
    data={'url': config.regions[req.query.id]};
    res.end(JSON.stringify(data));
});

app.get('/version', function (req, res) {
    res.contentType('application/json');
    res.writeHead(200);
    var datetime = new Date();
    console.log(datetime);
    datetime = datetime - config.date;
    console.log(datetime);
    var result = executionTime.printData(datetime);
    console.log(result);
    console.log(config.version);

    if(config.version.hasOwnProperty('uptime')){
     //do something if the key exist
     console.log('yes')
   }
    // I need to change to content ot uptime...
    res.end();
});

app.listen(config.port, config.listen, function () {
    console.log('\nServer is running at http://' + config.listen + ':' + config.port + '' +
        '\nServer hostname ' + config.listen + ' is listening on port ' + config.port + '!');
});
