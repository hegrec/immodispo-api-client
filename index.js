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
    });

    return sendable;
}

function ApiClient(username, password) {
    this.username = '';
    this.password = '';

    if (username) {
        this.username = username;
    }

    if (password) {
        this.password = password;
    }
}

ApiClient.prototype.get = function get(resource, cb) {
    var options = {
        username: this.username,
        password: this.password
    };

    needle.get(resource, options, function (error, response) {
        if (error) {
            return cb(error);
        }

        cb(null, response.body);
    });
}

ApiClient.prototype.post = function post(resource, data, cb) {
    var options = {
        username: this.username,
        password: this.password
    };

    needle.post(resource, stripNullUndefined(data), options, function (error, response) {
        if (error) {
            return cb(error);
        }

        cb(null, response.body);
    });
}

ApiClient.prototype.put = function put(resource, data, cb) {
    var options = {
        username: this.username,
        password: this.password
    };

    needle.put(resource, stripNullUndefined(data), options, function (error, response) {
        if (error) {
            return cb(error);
        }



        cb(null, response.body);
    });
}

ApiClient.prototype.remove = function remove(resource, cb) {
    var options = {
        username: this.username,
        password: this.password
    };

    needle.delete(resource, null, options, function (error, response) {
        if (error) {
            return cb(error);
        }

        cb(null, response.body);
    });
}

ApiClient.prototype.setAuthorization = function setAuthorization(username, password) {
    this.username = username;
    this.password = password;
}

module.exports = ApiClient;