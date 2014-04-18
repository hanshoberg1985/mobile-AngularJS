'use strict';

angular.module('fswireClientApp').factory('flashService', function($rootScope) {
  return {
    show: function(message) {
      $rootScope.flash = message;
    },
    clear: function() {
      $rootScope.flash = '';
    }
  };
});
