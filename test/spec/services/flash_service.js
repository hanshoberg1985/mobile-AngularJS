'use strict';

describe('Service: flashService', function () {

  // load the service's module
  beforeEach(module('fswireClientApp'));

  // instantiate service
  var flashService;
  beforeEach(inject(function (_flashService_) {
    flashService = _flashService_;
  }));

  it('should do something', function () {
    expect(!!flashService).toBe(true);
  });

});
