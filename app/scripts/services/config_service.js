'use strict';

angular.module('fswireClientApp').factory('configService', function () {

    var hostName = 'staging.fswire.com';
    var apiRoot = 'http://' + hostName + '/api/v1';
    var pusherKey = '2c33406e0172ac95cecd';
    var pusherAuthenticationEndpoint = '';
    return {
      host: function () { return hostName; },
      apiRoot: function() { return apiRoot; },
      pusherKey: function() { return pusherKey; }
    };
  });
