"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AttendanceController {
    constructor() { }
    insertAttendance(request, reply) {
        const attendanceModel = request.server.plugins['hapi-mongo-models'].Attendance;
        const attendance = request.payload;
        attendance.rollNumber = request.params.rollNumber;
        attendanceModel.insertOne(attendance, function (err, success) {
            if (err) {
                reply(err);
            }
            else {
                reply(success);
            }
        });
    }
    findAttendanceOfaStundent(request, reply) {
        const attendanceModel = request.server.plugins['hapi-mongo-models'].Attendance;
        const filter = {
            'rollNumber': request.params.rollNumber
        };
        attendanceModel.find(filter, function (err, success) {
            if (err) {
                reply(err);
            }
            else {
                reply(success);
            }
        });
    }
    editAttendance(request, reply) {
        const attendanceModel = request.server.plugins['hapi-mongo-models'].Attendance;
        let filter = {
            'rollNumber': request.params.rollNumber,
            'date': request.payload.date
        };
        const update = request.payload;
        update.rollNumber = request.params.rollNumber;
        attendanceModel.findOneAndUpdate(filter, update, function (err, success) {
            if (err) {
                reply(err);
            }
            else {
                reply(success);
            }
        });
    }
}
exports.AttendanceController = AttendanceController;
