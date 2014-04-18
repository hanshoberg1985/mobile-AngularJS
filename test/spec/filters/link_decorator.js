'use strict';

describe('Filter: linkDecorator', function () {

  // load the filter's module
  beforeEach(module('frontend.client.jsApp'));

  // initialize a new instance of the filter before each test
  var linkDecorator;
  beforeEach(inject(function ($filter) {
    linkDecorator = $filter('linkDecorator');
  }));

  it('should return the input prefixed with "linkDecorator filter:"', function () {
    var text = 'angularjs';
    expect(linkDecorator(text)).toBe('linkDecorator filter: ' + text);
  });

});
