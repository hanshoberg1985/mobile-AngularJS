'use strict';

describe('Controller: LogonCtrl', function () {

  // load the controller's module
  beforeEach(module('fswireClientApp'));

  var LogonControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LogonControllerCtrl = $controller('LogonCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
