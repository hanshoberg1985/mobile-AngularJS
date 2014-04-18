'use strict';

angular.module('fswireClientApp').factory('messageModel', function ($rootScope, apiService, localStorageService, sessionModel) {
    var messages = localStorageService.get('messages');
    if (messages === null || messages === undefined) messages = {};
    var privateMembers = {
      saveMessages:function() {
        localStorageService.set('messages', messages);
      },
      clearAllMessages:function() {
        localStorageService.set('messages', {} );
      }
    };
    return {
      clearCache: function() {
        privateMembers.clearAllMessages();
      },
      get: function (id) {
        var message = messages[id];
        if (!angular.isUndefined(message) && message.downloaded) {

          return message;

        } else {

          var apiCall = apiService.Messages.get(id, sessionModel.get('auth_token'))
          apiCall.success(function(data) {
            if (angular.isObject(data)) {
              messages[id] = data.response;
              messages[id]['downloaded'] = true;
              privateMembers.saveMessages();
              $rootScope.$broadcast('messageModel::downloaded', messages[id]);
            }
          });

          return !angular.isUndefined(message) ? message : apiCall;
        }
      },
      getCached: function(id) {
        return messages[id];
      },
      findOrCreate: function(messageObject) {
        if (angular.isUndefined(messages[message.id])) {
          messages[message.id] = message;
          privateMembers.saveMessages();
        } else {
          message = messages[message.id];
        }
        return message;
      }
    };
  });
