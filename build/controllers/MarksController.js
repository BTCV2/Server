"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MarksController {
    constructor() { }
    insertMarks(request, reply) {
        const mark = request.server.plugins['hapi-mongo-models'].Mark;
        let data = {
            'standard': request.params.standard,
            'subject': request.params.subject,
            'marks': request.payload
        };
        mark.insertOne(data, function (err, success) {
            if (err) {
                reply(err);
            }
            else {
                reply(success);
            }
        });
    }
    editMarks(request, reply) {
        const marks = request.server.plugins['hapi-mongo-models'].Mark;
        const filter = {
            'standard': request.params.standard,
            'subject': request.params.subject
        };
        const update = {
            'standard': request.params.standard,
            'subject': request.params.subject,
            'marks': request.payload
        };
        marks.findOneAndUpdate(filter, update, function (err, success) {
            if (err) {
                reply(err);
            }
            else {
                reply(success);
            }
        });
    }
    deleteMarks(request, reply) {
        const marks = request.server.plugins['hapi-mongo-models'].Mark;
        const filter = {
            'standard': request.params.standard,
            'subject': request.params.subject
        };
        marks.deleteOne(filter, function (err, success) {
            if (err) {
                reply(err);
            }
            else {
                reply(success);
            }
        });
    }
    getMarks(request, reply) {
        const mark = request.server.plugins['hapi-mongo-models'].Mark;
        const filter = {
            'standard': request.params.standard,
            'subject': request.params.subject
        };
        mark.find(filter, function (err, success) {
            if (err) {
                reply(err);
            }
            else {
                reply(success);
            }
        });
    }
}
exports.MarksController = MarksController;
