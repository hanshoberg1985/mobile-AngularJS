'use strict';

angular.module('fswireClientApp').filter('linkDecorator', function () {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

    return function (input) {
      return input.replace(exp,"<a href='$1' onclick='event.stopPropagation();' target='_blank'>$1</a>");
    };

  });
