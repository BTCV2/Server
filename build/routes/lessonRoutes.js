"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LessonController_1 = require("../controllers/LessonController");
exports.register = function (server, options, cont) {
    const lessonctrl = new LessonController_1.LessonController();
    server.route([
        {
            method: "GET",
            path: "/{standard}/{subject}/lesson",
            config: {
                auth: {
                    strategy: 'BTCAuth',
                    scope: ['admin', 'student']
                }
            },
            handler: lessonctrl.getLesson
        },
        {
            method: "POST",
            path: "/{standard}/{subject}/lesson",
            handler: lessonctrl.insertLesson
        },
        {
            method: "PUT",
            path: "/{standard}/{subject}/lesson",
            handler: lessonctrl.editLesson
        },
        {
            method: "DELETE",
            path: "/{standard}/{subject}/lesson",
            handler: lessonctrl.deleteLesson
        },
    ]);
    cont();
};
exports.register.attributes = {
    name: "btc-lessons-route",
    version: "1.0"
};
