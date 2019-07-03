const HapiJwt = require('hapi-auth-jwt2');
var authController = require('./controller');
var Validate = require('./validate');
const webtoken = require("jsonwebtoken");


exports.register = function (server, options, next) {


    server.register(HapiJwt);
    server.auth.strategy('jwt', 'jwt', {
        key: process.env.JWT_SECRET,
        validateFunc: function validateUser(decoded, request, callback) {
            const user = 'user-' + decoded.id;            
            console.log(user);
            console.log(request.auth.token);            
            return callback(null, true);
        },
        verifyOptions: { algorithms: ['HS256'] }
    });

    server.auth.default('jwt');


    server.route({
        method: 'Post',
        path: '/token',
        handler: authController.PostToken,
        config: {
            description: 'Generate Token ',
            notes: '<p>token</p><p> apiKey: key value, id:value</p>',
            tags: ['api'],
            validate: Validate.VerifyToken,
            auth:false
        }
    });

    // server.route({
    //     method: 'GET',
    //     path: '/',
    //     handler: authController.GetToken,
    //     config: {
    //         description: 'Generate Token ',
    //         notes: '<p>token</p>',
    //         tags: ['api'],
    //         auth: false

    //         //     validate: Validate.VerifyFileName
    //     }
    // });

    next();
}

exports.register.attributes = {
    pkg: require('./package.json')
};