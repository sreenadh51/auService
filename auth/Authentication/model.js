const Hapi = require('hapi');
var fs = require('fs');
const Confidence = require('confidence');
const webtoken = require("jsonwebtoken");
const redis = require('ioredis');

function authApi(config) {
    if (config) {
        dbConfig = config;
        //dbconfig2=config;
    }
}



authApi.prototype.PostToken = function (params) {
    var self = this;
    return new Promise(function (resolve, reject) {
        // if (params.apiKey == process.env.Api_Key) {
        //Token Regenration.
        let client = redis.createClient(process.env.REDIS_URL);
        self.generateToken(params.id).then(function (token) {
            self.createRedisSession(params.id, token, client).then(function (result) {

                return resolve({
                    token
                });
            }).catch(function (err) {
                return reject(err);
            });
        }).catch(function (err) {
            return reject(err);
        });
        // }
        // else
        // resolve('Invalid apiKey');

    });

}
authApi.prototype.generateToken = function (id) {

    return new Promise(function (resolve, reject) {

        var claims = {
            id: id,
        }

        let timeout;

        // if (result.length > 0) {
        //     timeout = result[0].timeout * 60 * 60;
        // } else {
        timeout = process.env.TOKEN_EXPIRY;
        // }
        // const cert = process.env.PHILLIP_PRIVATE_KEY.replace(/\\n/g, '\n');
        // var rsaprivateKey = fs.readFileSync(cert, "utf8");
        
        // const clientId = process.env.PHILLIP_CLIENTID;
        // const xapiKey = process.env.PHILLIP_X_API_KEY;
        // const currentSecs = Math.floor((Date.parse(new Date().toJSON())) / 1000);
        // var claims = {
        //     id: id,
        //     iss: clientId,
        //     iat: currentSecs,
        //     exp: currentSecs + 999,
        //     //   jti: uuid,
        //     //exp: Math.floor(new Date().getTime()/1000) + parseInt(process.env.TOKEN_EXPIRY)
        // };
        claims.expiry = parseInt(timeout);
        const token = webtoken.sign(claims, process.env.JWT_SECRET);
        const endpoint = '/token';
        var headers 

        return resolve(token);

    });
}

authApi.prototype.createRedisSession = function (id, token, redisClient) {

    return new Promise(function (resolve, reject) {

        let client = redisClient;


        let timeout;

        // if (result.length > 0) {
        //     timeout = result[0].timeout * 60 * 60;
        // } else {
        timeout = process.env.TOKEN_EXPIRY;
        //}

        const expiry = parseInt(timeout);

        const scopes = {
            scopes: [
                'user-' + id
            ]
        };

        client.set('user-' + id + '-' + token, JSON.stringify(scopes));
        if (expiry > 0) {
            client.expire('user-' + id + '-' + token, expiry);
        }
        //client.quit();
        return resolve(true);

        //});
    });

}
module.exports = authApi;

