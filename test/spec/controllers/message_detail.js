'use strict';

describe('Controller: MessageDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('fswireClientApp'));

  var MessageDetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MessageDetailCtrl = $controller('MessageDetailCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
