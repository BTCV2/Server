"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by gpalani on 02-02-2018.
 */
const MongoModel = require('mongo-models');
const Joi = require('joi');
class Test extends MongoModel {
}
exports.Test = Test;
Test.collection = 'tests';
Test.schema = Joi.object().keys({
    rollNumber: Joi.string().optional(),
    subject: Joi.string().optional(),
    date: Joi.string().optional(),
    mark: Joi.string().optional(),
    fullMark: Joi.string().optional(),
    percentage: Joi.number().optional()
});
module.exports = Test;
