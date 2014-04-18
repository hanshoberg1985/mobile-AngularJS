'use strict';

angular.module('fswireClientApp').controller('MessageDetailCtrl', function ($scope, $routeParams, messageModel){	
	if( $scope.selectedMessageId !== undefined && $scope.selectedMessageId>=0){
		$scope.message = messageModel.get($scope.selectedMessageId);
	}
	
	$scope.$on('messageModel::downloaded', function(event, message) {
		if ($scope.selectedMessageId === message.id) {
			$scope.message = message;
		}
	});
});