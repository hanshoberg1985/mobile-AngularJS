'use strict';

angular.module('fswireClientApp').controller('LogonCtrl', function ($scope, $location, $routeParams, authenticationService) {
  $scope.credentials = { email: '', password: '' };
  $scope.login = function() {
    authenticationService.login($scope.credentials).success(function() {
	
      if ( authenticationService.isLoggedIn() ){
      	if (localStorage.getItem("i") === null) {
				localStorage.i=0;
      }
       
       if(localStorage.i==0)
		{
		
			window.location.reload();
			localStorage.i=1;
		}	   
	  $('.nav-bar-left show').attr('id', 'sp-nav');
        $location.path('/');}
		else{
			 document.getElementById("error").style.display='block';

		}
		
    });
  };

  $scope.logout = function() {
    authenticationService.logout();
  };

  if ($routeParams.action === 'logout') {
    $scope.logout();
  }

});
