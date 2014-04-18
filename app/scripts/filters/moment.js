'use strict';
moment.lang('en', {
  relativeTime : {
    future: "in %s",
    past:   "%s ",
    s:  "1s",
    ss: "%ds",
    m:  "1m",
    mm: "%dm",
    h:  "1h",
    hh: "%dh",
    d:  "%dd",
    dd: "%dd",
    M:  "%dmth",
    MM: "%dmth",
    y:  "%dyr",
    yy: "%dyrs"
  }
});
angular.module('fswireClientApp').filter('moment', function () {

    return function (input) {
      return  moment(new Date(input)).fromNow();
    };
});
