#!/usr/bin/env nodejs

/*
* Copyright 2017 FIWARE Foundation, e.V.
* All Rights Reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License"); you may
* not use this file except in compliance with the License. You may obtain
* a copy of the License at
*
*         http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
* WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
* License for the specific language governing permissions and limitations
* under the License.
*/

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
    datetime = datetime - config.date;

    var result = executionTime.printData(datetime);
    console.log( config.version['FI-Health']['uptime'] )

    config.version['FI-Health']['uptime'] = result;

    console.log( config.version['FI-Health'])


    // I need to change to content ot uptime...
    res.end();
});

app.listen(config.port, config.listen, function () {
    console.log('\nServer is running at http://' + config.listen + ':' + config.port + '' +
        '\nServer hostname ' + config.listen + ' is listening on port ' + config.port + '!');
});
