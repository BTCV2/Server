"use strict";
/**
 * Created by gpalani on 02-02-2018.
 */
/**
 * Created by gpalani on 02-02-2018.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const MongoModel = require('mongo-models');
const Joi = require('joi');
class Marks extends MongoModel {
}
exports.Marks = Marks;
Marks.collection = 'marks';
Marks.schema = Joi.object().keys({
    standard: Joi.string().required(),
    subject: Joi.string().required(),
    marks: [Joi.string()]
});
module.exports = Marks;
