/**
 * Created by gpalani on 27-01-2018.
 */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const StudentController_1 = require("../controllers/StudentController");
exports.register = function (server, options, cont) {
    const studentctrl = new StudentController_1.StudentController();
    server.route([
        {
            method: "POST",
            path: "/student/create",
            handler: studentctrl.insertStudent
        },
        {
            method: "GET",
            path: "/student/{standard}/getRollNumber",
            handler: studentctrl.getLatestRollNumber
        },
        {
            method: "GET",
            path: "/student/{rollNumber}",
            handler: studentctrl.getStudent
        },
        {
            method: "PUT",
            path: "/student/{rollNumber}",
            handler: studentctrl.updateStudent
        },
        {
            method: "DELETE",
            path: "/student/{rollNumber}",
            handler: studentctrl.deleteStudent
        }
    ]);
    cont();
};
exports.register.attributes = {
    name: "btc-student-route",
    version: "1.0"
};
