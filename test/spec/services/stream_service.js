'use strict';

describe('Service: StreamService', function () {

  // load the service's module
  beforeEach(module('fswireClientApp'));

  // instantiate service
  var StreamService;
  beforeEach(inject(function (_StreamService_) {
    StreamService = _StreamService_;
  }));

  it('should do something', function () {
    expect(!!StreamService).toBe(true);
  });

});
