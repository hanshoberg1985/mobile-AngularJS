'use strict';

describe('Service: pusher', function () {

  // load the service's module
  beforeEach(module('fswireClientApp'));

  // instantiate service
  var pusher;
  beforeEach(inject(function (_pusher_) {
    pusher = _pusher_;
  }));

  it('should do something', function () {
    expect(!!pusher).toBe(true);
  });

});
