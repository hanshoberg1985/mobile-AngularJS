'use strict';

angular.module('fswireClientApp').filter('cleanText', function () {
    var exp = /([^.|\w])\1{2,}/;
    return function (input) {
      return input.replace(exp,"");
    };
  });
