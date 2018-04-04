/**
 * Created by gpalani on 24-01-2018.
 */
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Glue = require("glue");
const dbOpts = {
    url: 'mongodb://localhost:27017/demo',
    settings: {
        poolSize: 10
    },
    decorate: true
};
const manifest = {
    server: {
        "load": {
            "sampleInterval": 1000
        }
    },
    connections: [{
            port: 8088
        }],
    registrations: [
        {
            plugin: {
                register: 'hapi-mongodb',
                options: dbOpts
            }
        },
        {
            plugin: {
                register: './Authentication',
            }
        },
        {
            plugin: {
                register: './routes/studentRoutes',
            }
        },
        {
            plugin: {
                register: './routes/lessonRoutes',
            }
        },
        {
            plugin: {
                register: './routes/marksRoutes',
            }
        },
        {
            plugin: {
                register: './routes/attendanceRoutes',
            }
        },
        {
            plugin: {
                register: './routes/userRoutes',
            }
        },
        {
            plugin: {
                register: './routes/SyllabusCompletionRoutes',
            }
        },
        {
            plugin: {
                register: 'hapi-cors',
                options: {
                    origins: ['http://localhost:4200'],
                    methods: ['POST, GET, OPTIONS, PUT, DELETE'],
                }
            }
        },
        {
            plugin: {
                register: 'hapi-mongo-models',
                options: {
                    mongodb: {
                        uri: 'mongodb://localhost:27017/demo'
                    },
                    autoIndex: false,
                    models: {
                        Student: "./build/models/Student",
                        Lesson: "./build/models/Lessons",
                        Attendance: "./build/models/Attendance",
                        Mark: "./build/models/Marks",
                        User: "./build/models/User",
                        SyllabusCompletion: "./build/models/SyllabusCompletion"
                    }
                }
            }
        }
    ]
};
const options = {
    relativeTo: __dirname
};
const startServer = function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const server = yield Glue.compose(manifest, options);
            yield server.start();
            console.log('Server Started!');
        }
        catch (err) {
            console.error(err);
        }
    });
};
startServer();
