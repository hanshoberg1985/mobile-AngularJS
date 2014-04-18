'use strict';

angular.module('fswireClientApp').factory('authenticationService', function($rootScope, apiService, flashService, sessionModel) {

  var privateMembers = {
    loginSuccess: function(data, status, headers, config) {
      flashService.clear();
      $rootScope.$broadcast('authenticationService::authenticationChanged', data.id > 0);
    },
    loginError: function(response) {
      flashService.show(response.message);
    }
  };

  return {
    login: function(credentials) {
      var login = apiService.logonWithCredentials(credentials);
      login.success(privateMembers.loginSuccess);
      login.error(privateMembers.loginError);
      return login;
    },
    logout: function() {
      privateMembers.notifyAuthentication(false);
      var logout = apiService.logout();
      return logout;
    },
    isLoggedIn: function() {
      return sessionModel.get('authenticated') == 'true';
    },
    userId: function() {
      return sessionModel.get('user_id');
    },
    token: function() {
      return sessionModel.get('auth_token');
    }
  };
});