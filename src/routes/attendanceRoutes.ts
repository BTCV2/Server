/**
 * Created by gpalani on 09-02-2018.
 */
import * as Hapi from "hapi";
import {LessonController} from '../controllers/LessonController';
import {AttendanceController} from "../controllers/AttendanceController";
exports.register = function (server: Hapi.Server, options, cont) {
    const attendenceCtrl = new AttendanceController();
    server.route([
        {
            method:"GET",
            path:"/attendance/{rollNumber}",
            handler:attendenceCtrl.findAttendanceOfaStundent
        },
        {
            method:"POST",
            path:"/attendance/{rollNumber}",
            handler:attendenceCtrl.insertAttendance
        },
        {
            method:"PUT",
            path:"/attendance/{rollNumber}",
            handler:attendenceCtrl.editAttendance
        }
    ])
    cont();
}


exports.register.attributes = {
    name: "btc-attendance-route",
    version: "1.0"
};