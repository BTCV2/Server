/**
 * Created by gpalani on 24-01-2018.
 */
"use strict";
import * as Glue from "glue";
const dbOpts = {
    url: 'mongodb://btc17:btc17@ds257808.mlab.com:57808/btc17',
    settings: {
        poolSize: 10
    },
    decorate: true
}
const manifest = {
    server:{
        "load": {
            "sampleInterval": 1000
        }
    },
    connections:[{
        port:8088
    }],
    registrations:[
         {
         plugin:{
         register: 'hapi-mongodb',
         options:dbOpts
         }
         },
        {
            plugin :{
                register: './Authentication',
            }
        },
        {
            plugin:{
                register: './routes/studentRoutes',
            }
        },
        {
            plugin:{
                register: './routes/lessonRoutes',
            }
        },
        {
            plugin:{
                register: './routes/marksRoutes',
            }
        },
        {
            plugin:{
                register: './routes/attendanceRoutes',
            }
        },
        {
            plugin:{
                register: './routes/userRoutes',
            }
        },
        {
            plugin:{
                register:'hapi-cors',
                options : {
                    origins: ['http://localhost:4200']
                }
            }
        },
        {
            plugin:{
                register:'hapi-mongo-models',
                options:{
                    mongodb:{
                        uri: 'mongodb://btc17:btc17@ds257808.mlab.com:57808/btc17'
                    },
                    autoIndex: false,
                    models:{
                        Student:"./build/models/Student",
                        Lesson:"./build/models/Lessons",
                        Attendance: "./build/models/Attendance",
                        Mark:"./build/models/Marks",
                        User:"./build/models/User"
                    }
                }
            }
        }
    ]
}

const options:Object = {
    relativeTo: __dirname
};

const startServer = async function()  {
    try{
        const server = await Glue.compose(manifest,options);
        await server.start();
        console.log('Server Started!');
    }catch(err){
        console.error(err);
    }
}

startServer();