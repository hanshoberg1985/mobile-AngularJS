'use strict';

angular.module('fswireClientApp').controller('SearchCtrl', function ($scope, $location, $routeParams, searchModel) {
  
	var VIEW_TYPE_MESSAGES = 0;
    var VIEW_TYPE_LINKS = 1;
    $scope.viewType = VIEW_TYPE_LINKS;	

    var privateMembers = {
		
      loadLinks: function(lastId) {
        
        //TODO: Fix server side api to provide infinite scrolling for search links
        searchModel.links($scope.searchText, lastId);
      },
      loadMessages: function(lastId) {
        
        searchModel.messages($scope.searchText, lastId);
      },
      getOldestId: function() {			 
          return $scope.allSearchStreams.length > 0 ? $scope.allSearchStreams.sort(function (a, b) {if (a.url != undefined && b.url != undefined ){return a.url.id - b.url.id }})[0].url.id : 0;
      }
    };

    $scope.loadMore = function() {
		if ( $scope.viewType === VIEW_TYPE_MESSAGES ) {
        privateMembers.loadMessages(privateMembers.getOldestId());
      } else {
        privateMembers.loadLinks(privateMembers.getOldestId());
      }
    };  

  $scope.searchKey = function($event) {
	if ($event.keyCode == 13) {
		if ( $scope.searchText != undefined ) {
			if ($scope.viewType === VIEW_TYPE_MESSAGES){
				privateMembers.loadMessages(0);
			} else {
				privateMembers.loadLinks(0);
		}
		}else {
			if ($scope.viewType === VIEW_TYPE_MESSAGES){
				$scope.allSearchStreams = searchModel.allMessage();
			} else {
				$scope.allSearchStreams = searchModel.all();
		}   
	  }
	}
	
  };
  $scope.viewMessages = function(e) {
	  $scope.viewType = VIEW_TYPE_MESSAGES;

	  if ( $scope.searchText != undefined ) {
		privateMembers.loadMessages(0);
	  } else {
		$scope.allSearchStreams = searchModel.allMessage(0);
	  } 
  };
  $scope.viewLinks = function(e) {
	  $scope.viewType = VIEW_TYPE_LINKS;

	  if ( $scope.searchText != undefined ) {
		privateMembers.loadLinks(0);
	  } else {
		$scope.allSearchStreams = searchModel.all();
	  } 
	
  };
  //privateMembers.loadLinks(0);
  $scope.allSearchStreams = searchModel.all();
   
  $scope.searchStreamIndex = 0;
 /* $scope.$on('searchModel::userStreamAdded', function(event, search) {
    $scope.searchStreamIndex = $scope.searchStreams.length -1;
  }); */
	
		
  $scope.$on('messageModel::newMessage', function(event, message) {	  
		searchModel.addMessageToStream($scope.allSearchStreams, message, false);		
  });

  
});
