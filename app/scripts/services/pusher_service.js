'use strict';

angular.module('fswireClientApp').factory('pusherService', function ($rootScope, authenticationService, configService) {


  var configureAuthEndpoint = function() {
    if (authenticationService.isLoggedIn) {
      Pusher.channel_auth_endpoint = 'http://' + configService.host() +
                                     '/api/authenticate?user_id=' + authenticationService.userId() +
                                     '&auth_token=' + authenticationService.token();
    }
  };

  configureAuthEndpoint();

  var pusherSocket = new Pusher(configService.pusherKey());
  var pusherStreams = {};

  $rootScope.$on('authenticationService::authenticationChanged', function(event, isLoggedOn) {
      configureAuthEndpoint();
  });

  return {
    unregisterForNewMessages: function(id, channelName, fn) {
      if ( pusherStreams[channelName] !== undefined ) {
        var pusherStream = pusherStreams[channelName];
        pusherStream.newMessageCallbacksCount -= 1
        if (pusherStream.newMessageCallbacksCount === 0) {
          pusherSocket.unsubscribe(pusherStream.channelName);
          pusherStream.channel = null;
          delete pusherStreams[channelName];
        }

      }
    },
    registerForNewMessages: function(id, channelName, fn) {

      if ( pusherStreams[channelName] === undefined ) {

        pusherStreams[channelName] = {  id:id,
                                        channelName:channelName,
                                        channel:pusherSocket.subscribe(channelName),
                                        newMessageCallbacksCount:0 };

        var messageStream = pusherStreams[channelName];

        messageStream.channel.bind('send_message', function(data) {
          $rootScope.$broadcast('messageModel::newMessage', messageStream.id, data);
        });

      }
      pusherStreams[channelName].newMessageCallbacksCount += 1;
    }
  };
});