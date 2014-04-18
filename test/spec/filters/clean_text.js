'use strict';

describe('Filter: cleanText', function () {

  // load the filter's module
  beforeEach(module('frontend.client.jsApp'));

  // initialize a new instance of the filter before each test
  var cleanText;
  beforeEach(inject(function ($filter) {
    cleanText = $filter('cleanText');
  }));

  it('should return the input prefixed with "cleanText filter:"', function () {
    var text = 'angularjs';
    expect(cleanText(text)).toBe('cleanText filter: ' + text);
  });

});
