'use strict';

describe('Controller: StreamListCtrl', function () {

  // load the controller's module
  beforeEach(module('fswireClientApp'));

  var StreamsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StreamsCtrl = $controller('StreamListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
