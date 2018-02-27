"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AttendanceController_1 = require("../controllers/AttendanceController");
exports.register = function (server, options, cont) {
    const attendenceCtrl = new AttendanceController_1.AttendanceController();
    server.route([
        {
            method: "GET",
            path: "/attendance/{rollNumber}",
            handler: attendenceCtrl.findAttendanceOfaStundent
        },
        {
            method: "POST",
            path: "/attendance/{rollNumber}",
            handler: attendenceCtrl.insertAttendance
        },
        {
            method: "PUT",
            path: "/attendance/{rollNumber}",
            handler: attendenceCtrl.editAttendance
        }
    ]);
    cont();
};
exports.register.attributes = {
    name: "btc-attendance-route",
    version: "1.0"
};
