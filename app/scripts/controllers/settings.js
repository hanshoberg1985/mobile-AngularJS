'use strict';

angular.module('fswireClientApp').controller('SettingsCtrl', function ($scope, messageModel, streamModel) {

  $scope.clearCache = function() {
    streamModel.clearCache();
    messageModel.clearCache();
    streamModel.current();
    streamModel.all();
  };

});
