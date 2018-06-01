/**
 * Created by gpalani on 05-03-2018.
 */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = require("../controllers/UserController");
exports.register = function (server, options, cont) {
    const userctrl = new UserController_1.UserController();
    server.route([
        {
            method: "POST",
            path: "/user/create",
            config: {
                auth: {
                    strategy: 'BTCAuth',
                    scope: ['admin']
                }
            },
            handler: userctrl.insertUser
        },
        {
            method: "GET",
            path: "/user/{userName}",
            config: {
                auth: {
                    strategy: 'BTCAuth',
                    scope: ['student', 'admin']
                }
            },
            handler: userctrl.getUser
        },
        {
            method: "PUT",
            path: "/user/{userName}",
            config: {
                auth: {
                    strategy: 'BTCAuth',
                    scope: ['admin']
                }
            },
            handler: userctrl.updateUser
        },
        {
            method: "DELETE",
            path: "/user/{userName}",
            config: {
                auth: {
                    strategy: 'BTCAuth',
                    scope: ['admin']
                }
            },
            handler: userctrl.deleteUser
        },
        {
            method: "POST",
            path: "/login",
            handler: userctrl.login
        }
    ]);
    cont();
};
exports.register.attributes = {
    name: "btc-user-route",
    version: "1.0"
};
