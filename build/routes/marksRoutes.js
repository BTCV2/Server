"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MarksController_1 = require("../controllers/MarksController");
exports.register = function (server, options, cont) {
    const markctrl = new MarksController_1.MarksController();
    server.route([
        {
            method: "GET",
            path: "/{standard}/{subject}/mark",
            config: {
                auth: {
                    strategy: 'BTCAuth',
                    scope: ['student', 'admin']
                }
            },
            handler: markctrl.getMarks
        },
        {
            method: "POST",
            path: "/{standard}/{subject}/mark",
            config: {
                auth: {
                    strategy: 'BTCAuth',
                    scope: ['admin']
                }
            },
            handler: markctrl.insertMarks
        },
        {
            method: "PUT",
            path: "/{standard}/{subject}/mark",
            config: {
                auth: {
                    strategy: 'BTCAuth',
                    scope: ['admin']
                }
            },
            handler: markctrl.editMarks
        },
        {
            method: "DELETE",
            path: "/{standard}/{subject}/mark",
            config: {
                auth: {
                    strategy: 'BTCAuth',
                    scope: ['admin']
                }
            },
            handler: markctrl.deleteMarks
        },
    ]);
    cont();
};
exports.register.attributes = {
    name: "btc-marks-route",
    version: "1.0"
};
