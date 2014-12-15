'use strict';

var _ = require('lodash'),
    needle = require('needle');

function APIClient() {

    function get(resource, cb) {

        needle.get(resource, function (error, response) {
           if (error) {
               return cb(error);
           }

            cb(null, response);
        });
    }

    return {
        get: get
    };
}

module.exports = APIClient();