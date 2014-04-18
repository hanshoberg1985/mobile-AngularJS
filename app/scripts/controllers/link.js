'use strict';

angular.module('fswireClientApp').controller('streamLinkCtrl', function ($scope, $location, $routeParams, searchModel) {
  $scope.searchStreams = searchModel.all();
  $scope.searchStreamIndex = 0;

  $scope.$on('searchModel::userStreamAdded', function(event, search) {
    $scope.searchStreamIndex = $scope.searchStreams.length -1;
  }); 
  
 
});