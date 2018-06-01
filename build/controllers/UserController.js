"use strict";
/**
 * Created by gpalani on 27-01-2018.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const Boom = require("boom");
const jwt = require('jsonwebtoken');
/*const bcrypt = require('bcrypt');*/
class UserController {
    constructor() {
        this.createToken = (user) => {
            let scopes;
            let firstLogin;
            if (user.firstLogin === 'Y') {
                firstLogin = 'Y';
            }
            else if (user.firstLogin !== 'Y') {
                firstLogin = 'N';
            }
            if (user.role === 'admin') {
                scopes = 'admin';
            }
            else {
                scopes = 'student';
            }
            return jwt.sign({ id: user._id, username: user.userName, scope: scopes, firstLogin: firstLogin }, 'BTC', { algorithm: 'HS256', expiresIn: "1h" });
        };
    }
    insertUser(request, reply) {
        let self = this;
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(request.payload.password, salt, (err, hash) => {
                if (err) {
                }
                else {
                    const User = request.server.plugins['hapi-mongo-models'].User;
                    request.payload.firstLogin = 'Y';
                    request.payload.password = hash;
                    User.insertOne(request.payload, function (err, success) {
                        if (err) {
                            reply(err);
                        }
                        else {
                            let self = new UserController();
                            reply({ id_token: self.createToken(success) }).code(201);
                        }
                    });
                }
            });
        });
    }
    getUser(request, reply) {
        const User = request.server.plugins['hapi-mongo-models'].User;
        const filter = {
            "userName": request.params.userName
        };
        User.findOne(filter, function (err, success) {
            if (err) {
                reply(err).code(500);
            }
            else if (success === null) {
                reply().code(404);
            }
            else {
                reply(success).code(200);
            }
        });
    }
    updateUser(request, reply) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(request.payload.password, salt, (err, hash) => {
                if (err) {
                }
                else {
                    const User = request.server.plugins['hapi-mongo-models'].User;
                    const filter = {
                        "userName": request.params.userName
                    };
                    request.payload.password = hash;
                    User.findOneAndUpdate(filter, request.payload, function (err, success) {
                        if (err) {
                            reply().code(500);
                        }
                        else {
                            reply(success);
                        }
                    });
                }
            });
        });
    }
    deleteUser(request, reply) {
        const User = request.server.plugins['hapi-mongo-models'].User;
        const filter = {
            "userName": request.params.userName
        };
        User.deleteOne(filter, function (err, success) {
            if (err) {
                reply().code(500);
            }
            else {
                reply(success).code(204);
            }
        });
    }
    login(request, reply) {
        const User = request.server.plugins['hapi-mongo-models'].User;
        const filter = {
            "userName": request.payload.userName
        };
        console.log('fileter', filter);
        User.findOne(filter, function (err, success) {
            if (err) {
                reply(err).code(500);
            }
            else if (success === null) {
                reply(Boom.badRequest('Incorrect password!'));
            }
            else {
                /* reply(success).code(200)*/
                bcrypt.compare(request.payload.password, success.password, (err, isValid) => {
                    console.log("request.payload.password", request.payload.password);
                    console.log("success.password", success.password);
                    if (err) {
                        console.log(err);
                        reply(err);
                    }
                    if (isValid) {
                        /* reply(success);*/
                        let self = new UserController();
                        reply({ id_token: self.createToken(success) }).code(201);
                    }
                    else {
                        reply(Boom.badRequest('Incorrect password! Please Check'));
                    }
                });
            }
        });
    }
}
exports.UserController = UserController;
