#!/usr/bin/env nodejs

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
