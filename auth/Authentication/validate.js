var Joi = require('joi');
var Validate = module.exports = {};
var Boom = require('boom');

Validate.VerifyToken = {
    payload: {                
      //  apiKey: Joi.string().required(),
        id: Joi.string().required(),
        system:Joi.string()
    }
}