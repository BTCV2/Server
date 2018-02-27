/**
 * Created by gpalani on 24-01-2018.
 */
/**
 * Created by gpalani on 23-01-2018.
 */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = function (server, options, cont) {
    server.route([
        {
            method: "GET",
            path: "/demo",
            /*config: {
                cors: {
                    origin: ['*'],
                    additionalHeaders: ['cache-control', 'x-requested-with']
                }
            },*/
            handler: function (req, rep) {
                const Movie = req.server.plugins['hapi-mongo-models'].Movie;
                const filter = {};
                filter.name = "Recess School Day Out";
                Movie.find({}, function (err, result) {
                    if (err) {
                        rep(err);
                    }
                    else {
                        rep(result);
                    }
                });
                // reply(results);
            }
        }
    ]);
    cont();
};
exports.register.attributes = {
    name: "btc-route",
    version: "1.0"
};
