'use strict';

angular.module('fswireClientApp').factory('apiService', function($http, sessionModel, configService) {

    var buildUrl = function(path) {
        return configService.apiRoot() + path;
    };
    var clearSessionInformation = function() {
        sessionModel.unset('auth_token');
        sessionModel.set('authenticated', false);
        sessionModel.unset('user_id');
        sessionModel.unset('is_admin');
        sessionModel.unset('is_cleaner');

    };
    var storeSessionInformation = function(responseData) {
        if ( responseData.id > 0 ) {
            sessionModel.set('auth_token', responseData.auth_token);
            sessionModel.set('authenticated', true);
            sessionModel.set('user_id', responseData.id);
            sessionModel.set('is_admin', responseData.is_admin);
            sessionModel.set('is_cleaner', responseData.is_cleaner);
        }
    };

    return {
        logonWithCredentials: function(credentials) {

            clearSessionInformation();
            var params = {
                "user_login": {
                    "email": credentials.email,
                    "password": credentials.password
                }
            };
            var result = $http.post('http://' + configService.host() + '/api/users/sign_in.json', params);
            result.success(storeSessionInformation);
            return result;
        },

        logout: function() {
            clearSessionInformation();
            return $http.put('http://' + configService.host() + '/api/users/sign_out.json');
        },
        Streams: {
			
            all: function(authToken) {
                return $http.get(buildUrl('/streams.json?auth_token=' + authToken));
            },
            find: function(searchText, authToken) {
                return $http.get(buildUrl('/streams/search?auth_token=' + authToken + '&id=' + searchText));
            },
            findById: function(id, authToken) {
                return $http.get(buildUrl('/streams/' + id + '?auth_token=' + authToken + '&id=' + id.toString()));
            },
            messages: function(id, lastId, onlyMessagesWithUrls, authToken) {
                lastId = null !== lastId ? lastId.toString() : '0';

                var params = { 'urls_only': onlyMessagesWithUrls };

                return $http.get(buildUrl('/streams/' + id.toString() + '/history.json?auth_token=' + authToken + '&before=' + lastId ));
            },
            add: function(userId, id, authToken) {
                return $http.get(buildUrl('/users/' + userId + '/streams/add.json?auth_token=' + authToken + '&id=' + id.toString()));
            },
            remove: function(userId, id, authToken) {
                return $http.get(buildUrl('/users/' + userId + '/streams/remove.json?auth_token=' + authToken + '&id=' + id.toString()));
            },
            current: function(userId, authToken) {
                return $http.get(buildUrl('/users/' + userId + '/streams/current.json?auth_token=' + authToken));
            },
            recent: function(userId, authToken) {
                return $http.get(buildUrl('/users/' + userId + '/streams/recent.json?auth_token=' + authToken));
            },
            favourites: function(userId, authToken) {
                return $http.get(buildUrl('/users/' + userId + '/streams/favourties.json?auth_token=' + authToken));
            },
            updateOrder: function(userId, orderedRoomIds, authToken) {
                $http.post(buildUrl('/users/' + userId + '/streams/update_order.json?auth_token=' + authToken), orderedRoomIds);
            },
            links:function(streamId, lastLinkId, authToken){
                return $http.get(buildUrl('/streams/' + streamId.toString() + '/links.json?auth_token=' + authToken));
            } 

        },
		
		Search: {
			all: function(authToken) {
                return $http.get(buildUrl('/search.json?auth_token=' + authToken));
            },
			allMessage: function(lastLinkId, authToken) {
                return $http.get(buildUrl('/search.json?auth_token=' + authToken + '&type=messages' + '&before=' + lastLinkId));
            },
			find: function(searchText, authToken) {
                return $http.get(buildUrl('/search.json?auth_token=' + authToken + '&q=' + searchText));
            },
			current: function(userId, authToken) {
                return $http.get(buildUrl('/users/' + userId + '/streams/current.json?auth_token=' + authToken));
            },
			messages: function(search_text, lastLinkId, authToken) {
				lastId = null !== lastId ? lastId.toString() : '0';
				return $http.get(buildUrl('/search.json?auth_token=' + authToken + '&q=' + search_text + '&type=messages' + '&before=' + lastLinkId));
			},
			links: function(searchText, lastLinkId, authToken) {
				return $http.get(buildUrl('/search.json?auth_token=' + authToken + '&q=' + searchText + '&before=' + lastLinkId ));
			}
		},
		
		SearchMessage: {
			find:function(search_text, messages, authToken){
				return $http.get(buildUrl('/search.json?auth_token=' + authToken + '&q=' + search_text + '&type=messages'));
			}
		},

        Messages: {
            post: function(messageText) {
                return messageText;
            },
            favourites: function() {},
            addToFavourites: function() {},
            removeFromFavouties: function() {},
            hardDelete: function() {},
            get: function(id, authToken) {
                return $http.get(buildUrl('/messages/' + id + '.json?auth_token=' + authToken));
            }
        }
    };
});