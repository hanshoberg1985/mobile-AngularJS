'use strict';

angular.module('fswireClientApp').factory('searchModel', function ($rootScope, apiService, pusherService, localStorageService, sessionModel) {

    var allSearchStreams = localStorageService.get('all_search_streams');
    if (allSearchStreams === null) allSearchStreams = [];

    var currentSearchStreams = localStorageService.get('current_search_streams');
    if (currentSearchStreams === null) currentSearchStreams = [];

    var privateMembers = {
        includesLink: function(stream, link) {
          var exits = false;
          angular.forEach(stream.links, function(value, key){
             if (value.url === link) {
              exits = true;
             };
           });
          return exits;
        },

        includesMessage: function(stream, id) {
          var exits = false;
          angular.forEach(stream.messages, function(value, key){
             if (value.id === id) {
              exits = true;
             };
           });
          return exits;
        },
        includesStream:function(id) {
          var streamExists = false;
          angular.forEach(currentSearchStreams, function(value, key){
             if (value.chat.id === id) {
              streamExists = true;
             };
           });
          return streamExists;
        },

        addToCurrentStreams:function(stream) {
          stream['messages'] = [];
          stream['links'] = [];
          if (!privateMembers.includesStream(stream.chat.id)) {
            currentSearchStreams.push(stream);
            $rootScope.$broadcast('searchModel::userStreamAdded', stream);
          }
        },

        removeFromCurrentStream:function(stream) {
          var size = currentSearchStreams.length;
          for(var idx =0; idx< size; idx++) {
            if (currentSearchStreams[idx].chat.id == stream.chat.id)  {
              currentSearchStreams.splice(idx,1)
              break;
            }
          }
        },

        saveCurrentStreamsList:function() {
          localStorageService.set('current_search_streams', currentSearchStreams);
        },

        saveAllStreamList:function() {
          localStorageService.set('all_search_streams', allSearchStreams);
        },

        clearAllStreamsList:function() {
          localStorageService.set('all_search_streams', []);
        },

        clearCurrentStreamsList:function() {
          localStorageService.set('current_search_streams', []);
        }
    };

    return {
      clearCache: function() {
        privateMembers.clearCurrentStreamsList();
        privateMembers.clearCurrentStreamsList();
      },
      all: function() {
        if (allSearchStreams.length === 0) {
          var apiCall = apiService.Search.all(sessionModel.authenticationToken());
          apiCall.success(function(data) {
            angular.forEach(data.response, function(stream) {
              allSearchStreams.push(stream);
            });

            privateMembers.saveAllStreamList();
          });
        };
        return allSearchStreams;
      },
      allMessage: function() {
        //if (allSearchStreams.length === 0) {
          var apiCall = apiService.Search.allMessage(sessionModel.authenticationToken());
          apiCall.success(function(data) {
            angular.forEach(data.response, function(stream) {
              allSearchStreams.push(stream);
            });

            privateMembers.saveAllStreamList();
          });
        //};
        return allSearchStreams;
      },	  
      find: function (searchString) {
        var apiCall = apiService.Search.find(searchString, sessionModel.authenticationToken());
        apiCall.success(function(data) {
          angular.forEach(data.response, function(stream) {
            allSearchStreams.push(stream);
			
          });
		  
          privateMembers.saveAllStreamList();
        });
        return allSearchStreams;
      },
      current: function() {
        var apiCall = apiService.Search.current(sessionModel.get('user_id'), sessionModel.authenticationToken());

        apiCall.success(function(data) {

          angular.forEach(data, function(stream) {
            privateMembers.addToCurrentStreams(stream);
          });

          privateMembers.saveCurrentStreamsList();

        });

        return currentSearchStreams;
      },  
      messages: function (searchString, lastLinkId) {
		var self = this;
        apiService.Search.messages(searchString, lastLinkId, sessionModel.get('auth_token')).success(function(data){
          angular.forEach(data, function(dataItem){
            self.addMessageToStream(stream, dataItem.url, true);
          });
        });

       /* var apiCall = apiService.Search.messages(searchString, lastLinkId, sessionModel.authenticationToken());
        apiCall.success(function(data) {
          angular.forEach(data.response, function(stream) {
            allSearchStreams.push(stream);
			
          });
		  
          privateMembers.saveAllStreamList();
        });
        return allSearchStreams;*/
      },
	  addMessages: function (lastLinkId){
		  var self = this;
        apiService.Search.allMessages(lastLinkId, sessionModel.get('auth_token')).success(function(data){
          angular.forEach(data, function(dataItem){ 
            self.addMessageToStream(stream, dataItem.url, true);
          });
        });			
	  },
      addMessageToStream: function(allSearchStreams, url, appendMessage) {        
          appendMessage ? allSearchStreams.push(message) : allSearchStreams.unshift(message);        
      },
      links: function(searchString, lastLinkId) {
        var self = this;
        apiService.Search.links(searchString, lastLinkId, sessionModel.get('auth_token')).success(function(data) {
          angular.forEach(data.response, function(stream) {
            //allSearchStreams.push(stream);
			self.addLinkToStream(stream, stream.url, true);
          });
        });
      },
      addLinkToStream: function(stream, link, appendLink) {
        //if (!privateMembers.includesLink(stream, link.url)) {
          appendLink ? allSearchStreams.push(link) : allSearchStreams.unshift(link);
        //}
      }
    };
  });