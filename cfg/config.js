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

var config = {} ;

config.regions = {
   'Spain': '/public/Spain.html',
   'Brittany': '/public/Brittany.html',
   'Lannion': '/public/Lannion.html'
};

config.port = 3000;
config.listen = '0.0.0.0';

// doc should be a link to the API documentation in the gh-pages (*.github.io/)
config.version = {
    'FI-Health': {
      'version': '1.0.0',
      'release_date': '2017-07-31',
      'uptime': 'UPTIME',
      'git_hash': 'd1713771d2c6172617a16e556f17984fd12304cb',
      'doc': 'to be provided'
    }
};

config.date = new Date();

module.exports = config;
