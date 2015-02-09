'use strict';

var _ = require('lodash'),
    needle = require('needle');

/**
  * Strip these as they will be treated by the API as null if not sent
*/
function stripNullUndefined(obj) {
    var sendable = {};
    _.forOwn(obj, function(val, key) {
        //strip undefined and null
        if (!(_.isNull(val) || _.isUndefined(val))) {
            sendable[key] = val;
        }
    })
    return sendable;
}

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
            headers: {'X-Epic-Auth': authToken}
        };

        needle.post(resource, stripNullUndefined(data), options, function (error, response) {
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