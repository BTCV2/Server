"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by gpalani on 02-02-2018.
 */
const MongoModel = require('mongo-models');
const Joi = require('joi');
class Attendance extends MongoModel {
}
exports.Attendance = Attendance;
Attendance.collection = 'attendance';
Attendance.schema = Joi.object().keys({
    rollNumber: Joi.string().optional(),
    date: Joi.string().optional(),
    type: Joi.string().optional(),
    entryTime: Joi.string().optional(),
    exitTime: Joi.string().optional()
});
module.exports = Attendance;
