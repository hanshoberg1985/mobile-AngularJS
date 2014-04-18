'use strict';

angular.module('fswireClientApp').controller('StreamListCtrl', function ($scope, $dialog, $location, $routeParams, streamModel) {

  $scope.currentStreams = streamModel.current();
  $scope.currentStreamIndex = 0;

  $scope.$on('streamModel::userStreamAdded', function(event, stream) {
    $scope.currentStreamIndex = $scope.currentStreams.length -1;
  });

});