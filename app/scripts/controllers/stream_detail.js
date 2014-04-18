'use strict';
angular.module('fswireClientApp').controller('StreamDetailCtrl', function ($scope, $location, $routeParams, streamModel) {

    var VIEW_TYPE_MESSAGES = 0;
    var VIEW_TYPE_LINKS = 1;
    $scope.viewType = VIEW_TYPE_MESSAGES;

    $scope.selectedMessageId = -1;

    var privateMembers = {

      loadLinks: function() {
        $scope.viewType = VIEW_TYPE_LINKS;
        //TODO: Fix server side api to provide infinite scrolling for stream links
        streamModel.links($scope.stream, 0);
      },
      loadMessages: function(lastId) {
        $scope.viewType = VIEW_TYPE_MESSAGES;
        streamModel.messages($scope.stream, lastId);
      },
      getOldestMessageId: function() {
          return $scope.stream.messages.length > 0 ? $scope.stream.messages.sort(function (a, b) { return a.id - b.id })[0].id : 0;
      },
      getOldestLinkId: function() {
          return $scope.stream.links.length > 0 ? $scope.stream.links.sort(function (a, b) { return a.id - b.id })[0].id : 0;
      }
    };

    $scope.loadMore = function() {
      if ( $scope.viewType === VIEW_TYPE_MESSAGES ) {
        privateMembers.loadMessages(privateMembers.getOldestMessageId());console.log($scope.stream);
      } else {
        privateMembers.loadLinks();
      }
    };

	$scope.expand=function(messageId){
      $scope.selectedMessageId = ($scope.selectedMessageId === messageId) ? -1 : messageId;	 
	  $scope.message = messageModel.get($scope.selectedMessageId);	  
	};

	$scope.viewMessages=function(){
		$scope.viewType = VIEW_TYPE_MESSAGES;
	};

    $scope.viewLinks=function(){
      privateMembers.loadLinks();
    };

	$scope.removeStream=function(){
		streamModel.remove($scope.stream);
    streamModel.unregisterForNewPushMessages($scope.stream.chat.id, $scope.stream.chat.channel_presence_name, true);
	};

    streamModel.registerForNewPushMessages($scope.stream.chat.id, $scope.stream.chat.channel_presence_name, true);

    privateMembers.loadMessages(0); console.log($scope.stream);

    $scope.$on('messageModel::newMessage', function(event, streamId, message) {
      if ($scope.stream.chat.id === streamId) {
        streamModel.addMessageToStream($scope.stream, message, false);
        $scope.$apply();
      };
    });
});
