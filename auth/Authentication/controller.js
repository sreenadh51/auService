const authModel = require('./model');
var fs = require('fs');
const Boom = require('boom');
var authController = module.exports = {};

var aModel = new authModel();

authController.PostToken = function (request, reply) {

    const params = {
        apiKey: request.payload.apiKey == undefined ? '' : request.payload.apiKey,
        id: request.payload.id == undefined ? '' : request.payload.id,
        system: request.payload.system==undefined?'':request.payload.system
    }
    var token = aModel.PostToken(params);    
    var val;    
    token.then(function (value) {       
    if (value == 'Invalid apiKey')
        return reply(value).code(404);
    else
        return reply(value['token']).code(201);
    });
};






