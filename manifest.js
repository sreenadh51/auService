const Confidence = require('confidence');
const Path = require('path');
const Fs = require('fs');
const Inert = require('inert');

const criteria = {
    env: process.env.NODE_ENV
};

const manifest = {
    connections: [
        {
            host: process.env.HOST,
            port: process.env.PORT,
            routes: {
                cors: true
            },        
            labels: ['api']
        }
    ],
    registrations: [
        {
            plugin: {
                register: 'inert'
            }
        },
        {
            plugin: {
                register: 'vision'
            }
        },
        {
            plugin: {
                register: './auth/Authentication'
            }
        },
        {
            plugin: {
                register: 'hapi-swagger',
                options: {
                    info: {
                        title: 'Auth Api',
                        version: '1.0.1'
                     },                     
                    securityDefinitions: {
                        'jwt': {
                            'type': 'apiKey',
                            'name': 'Authorization',
                            'in': 'header'
                        }
                    },
                    security: [{ 'jwt': [] }]
                }
            }
        }
        
    ]
};

const store = new Confidence.Store(manifest);

exports.get = function (key) {
    return store.get(key, criteria);
};
