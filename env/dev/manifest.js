'use strict';

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
                        title: 'Authentication API',
                        version: '0.0.005'
                    },
                    basePath: '/auService/',
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
        },
    ]
};

const store = new Confidence.Store(manifest);

exports.get = function (key) {
    return store.get(key, criteria);
};
