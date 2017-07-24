#!/usr/bin/env nodejs

/**
 * Module dependencies.
 */

const express = require('express');
const fs = require('fs');

/** 
 * Set working directory...
 */
process.chdir(__dirname+"/..");

/**
 *
 */
const config = require('../cfg/config');

const hostname = '0.0.0.0';
const port = 3000;
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

app.listen(port, function () {
    console.log('\nServer is running at http://' + config.liten + ':' + config.port + '' +
        '\nServer hostname ' + config.listen + ' is listening on port ' + config.port + '!');
});
