'use strict';

angular.module('fswireClientApp').factory('sessionModel', function() {
  return {
    get: function(key) {
      return sessionStorage.getItem(key);
    },
    set: function(key, val) {
      return sessionStorage.setItem(key, val);
    },
    unset: function(key) {
      return sessionStorage.removeItem(key);
    },
    authenticationToken: function() {
      return sessionStorage.getItem('auth_token');
    },
    userId: function() {
      return sessionStorage.getItem('user_id');
    }
  };
});