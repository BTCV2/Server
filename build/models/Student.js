"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by gpalani on 27-01-2018.
 */
const MongoModel = require('mongo-models');
const Joi = require('joi');
class Student extends MongoModel {
}
exports.Student = Student;
Student.collection = 'students';
Student.schema = Joi.object().keys({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    rollNumber: Joi.string().optional(),
    standard: Joi.string().optional(),
    school: Joi.string().optional(),
    phoneNumber: Joi.string().optional(),
    parentName: Joi.string().optional(),
    email: Joi.string().optional(),
    image: Joi.any().optional()
});
module.exports = Student;
