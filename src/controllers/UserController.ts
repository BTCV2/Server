/**
 * Created by gpalani on 27-01-2018.
 */

import * as Hapi from 'hapi';
import * as bcrypt from 'bcrypt';
import * as Boom from "boom";
const jwt = require('jsonwebtoken');
/*const bcrypt = require('bcrypt');*/
export class UserController{
    constructor(){}
    public  insertUser(request: Hapi.Request, reply){
        let self = this;
        bcrypt.genSalt(10,(err, salt)=>{
            bcrypt.hash(request.payload.password, salt, (err, hash) => {
               if(err){

               }else{
                   const User = request.server.plugins['hapi-mongo-models'].User;
                   request.payload.password = hash;
                   User.insertOne(request.payload,function(err,success){
                       if(err){
                           reply(err)
                       }
                       else{
                           let self = new UserController();
                           reply({ id_token: self.createToken(success) }).code(201);
                       }
                   });
               }
            });
        });

    }

    public getUser(request: Hapi.Request, reply){
        const User = request.server.plugins['hapi-mongo-models'].User;
        const filter = {
            "userName":request.params.userName
        }
        User.findOne(filter, function (err, success) {
            if(err){
                reply(err).code(500);
            }
            else if(success === null){
                reply().code(404);
            }
            else{
                reply(success).code(200)
            }

        })
    }

    public updateUser(request: Hapi.Request, reply){
        const User = request.server.plugins['hapi-mongo-models'].User;
        const filter = {
            "userName":request.params.userName
        }

        User.findOneAndUpdate(filter, request.payload, function (err, success) {
            if(err){
                reply().code(500);
            }else{
                reply(success)
            }

        })
    }

    public deleteUser(request: Hapi.Request, reply){
        const User = request.server.plugins['hapi-mongo-models'].User;
        const filter = {
            "userName":request.params.userName
        }

        User.deleteOne(filter,function (err,success) {
            if(err){
                reply().code(500);
            }else{
                console.log("DELETED ", success)
                reply(success).code(204)
            }

        })
    }


    public login(request: Hapi.Request, reply){
        const User = request.server.plugins['hapi-mongo-models'].User;
        const filter = {
            "userName":request.payload.userName
        }
        console.log('equest.payload',request.payload);
        User.findOne(filter, function (err, success) {
            if(err){
                reply(err).code(500);
            }
            else if(success === null){
                console.log('SUCCESS', success);
                console.log('filter', filter);
                reply().code(404);
            }
            else{
               /* reply(success).code(200)*/
                bcrypt.compare(request.payload.password, success.password, (err, isValid) => {
                    if (isValid) {
                       /* reply(success);*/
                        let self = new UserController();
                        reply({ id_token: self.createToken(success) }).code(201);
                    }
                    else {
                        reply(Boom.badRequest('Incorrect password!'));
                    }
                });
            }

        })
    }


    public createToken = (user) => {
        let scopes;
        if (user.role === 'admin') {
            scopes = 'admin';
        }
        else{
            scopes = 'student';
        }

        return jwt.sign({ id: user._id, username: user.userName, scope: scopes }, 'BTC', { algorithm: 'HS256', expiresIn: "1h" } );


    }
}
