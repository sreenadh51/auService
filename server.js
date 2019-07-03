require('dotenv').config({ path: './env/dev/.env' });
const Glue = require('glue');

var Manifest = require('./manifest');
const options = {
    relativeTo: __dirname
};
 
Glue.compose(Manifest.get('/'),options, function (err, server) {

    server.start(function (err) {
        if (err) {
            throw err;
        }
        console.log('server started');
    });
});