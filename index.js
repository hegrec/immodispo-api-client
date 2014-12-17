'use strict';

var _ = require('lodash'),
    needle = require('needle');

function APIClient() {
    var authToken = 'supersecretkey';


    function get(resource, cb) {
        var options = {
            headers: {'X-Epic-Auth': authToken}
        };

        needle.get(resource, options, function (error, response) {
            if (error) {
                return cb(error);
            }

            cb(null, response.body);
        });
    }

    function post(resource, data, cb) {
        var options = {
            headers: {'X-Epic-Auth': authToken},
            multipart: true
        };

        needle.post(resource, data, options, function (error, response) {
            if (error) {
                return cb(error);
            }

            cb(null, response.body);
        });
    }

    function setAuthToken(token) {
        authToken = token;
    }

    return {
        get: get,
        post: post,
        setAuthToken: setAuthToken
    };
}

module.exports = APIClient();