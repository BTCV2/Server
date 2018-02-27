"use strict";
/**
 * Created by gpalani on 02-02-2018.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const MongoModel = require('mongo-models');
const Joi = require('joi');
class Lessons extends MongoModel {
}
exports.Lessons = Lessons;
Lessons.collection = 'lessons';
Lessons.schema = Joi.object().keys({
    standard: Joi.string().required(),
    subject: Joi.string().required(),
    lessons: [Joi.object().keys({
            lessonNumber: Joi.string(),
            lessonName: Joi.string()
        })]
});
module.exports = Lessons;
