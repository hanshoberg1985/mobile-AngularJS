'use strict';

document.ontouchmove = function(event) {
    // provent body move (ipad)
    var sourceElement = event.target || event.srcElement;
    if(!angular.element(sourceElement).hasClass('enable_touchmove')) {
      e.preventDefault();
    }
};

function partition(items, size) {
  var p = [];
  for (var i=Math.floor(items.length/size); i-->0; ) {
      p[i]=items.slice(i*size, (i+1)*size);
  }
  return p;
}

angular.module('fswireClientApp', ['angular-carousel','ngResource','loading', 'ui.bootstrap', 'shoppinpal.mobile-menu', 'LocalStorageModule']).config(['$routeProvider', '$httpProvider', '$locationProvider', function ($routeProvider, $httpProvider, $locationProvider) {
//alert($locationProvider.toSource());
  $routeProvider.
    when('/', { templateUrl: 'views/streams.html', controller: 'StreamListCtrl' }).
    when('/login', { templateUrl: 'views/login.html', controller: 'LogonCtrl'}).
    when('/login/:action', { templateUrl: 'views/login.html', controller: 'LogonCtrl'}).
    when('/settings', { templateUrl: 'views/settings.html', controller: 'SettingsCtrl'}).
    when('/information', { templateUrl: 'views/information.html', controller: 'InformationCtrl'}).
	when('/search', { templateUrl: 'views/search.html', controller: 'SearchCtrl'}).
    otherwise({ redirectTo: '/login' });

  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];

}]);

angular.module('fswireClientApp').run(function($rootScope, $location, authenticationService, flashService) {
  var routesThatDoNotRequireAuth = ['/login', '/about'];
$rootScope.$on('$routeChangeStart', function(event, next, current) {

var url=$location.path();
if(url == '/login')
{
	if(!authenticationService.isLoggedIn())
	{	$('#sp-nav').remove();
		$location.path('/login');
	}
	 else
	 {
         //$location.path('/main');
	 }
	
}
    if(!_(routesThatDoNotRequireAuth).contains($location.path()) && !authenticationService.isLoggedIn()) {
	 $location.path('/login');
      flashService.show('Please log in to continue.');
    }   ;                         

  });
});
