/**
 * Created by gpalani on 23-01-2018.
 */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
//import {MongoModels} from "mongo-models";
const MongoModel = require('mongo-models');
const Joi = require('joi');
class Movie extends MongoModel {
}
exports.Movie = Movie;
Movie.collection = 'movies';
Movie.schema = Joi.object().keys({
    name: Joi.string().optional(),
    rating: Joi.string().optional()
});
/*export let Movie: Movies = new Movies();*/
module.exports = Movie;
