/**
 * Created by gpalani on 06-02-2018.
 */
import * as Hapi from "hapi";
import {LessonController} from '../controllers/LessonController';
exports.register = function (server: Hapi.Server, options, cont) {
    const lessonctrl = new LessonController();
    server.route([
        {
            method:"GET",
            path:"/{standard}/{subject}/lesson",
            config:{
                auth: {
                    strategy: 'BTCAuth',
                    scope: ['user','admin']
                }
            },
            handler:lessonctrl.getLesson
        },
        {
            method:"POST",
            path:"/{standard}/{subject}/lesson",
            handler:lessonctrl.insertLesson
        },
        {
            method:"PUT",
            path:"/{standard}/{subject}/lesson",
            handler:lessonctrl.editLesson
        },
        {
            method:"DELETE",
            path:"/{standard}/{subject}/lesson",
            handler:lessonctrl.deleteLesson
        },
    ])
    cont();
}


exports.register.attributes = {
    name: "btc-lessons-route",
    version: "1.0"
};