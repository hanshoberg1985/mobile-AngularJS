'use strict';

angular.module('fswireClientApp').controller('ApplicationCtrl', function ($scope, $location, streamModel, authenticationService,sessionModel) {

	$scope.showAddModal=false;
	$scope.selected = undefined;
	$scope.isMobile=false;
	$scope.allStreams = streamModel.all();
	$scope.showMenus=false;
	var w=angular.element(window);

  $scope.view = { show:authenticationService.isLoggedIn() };

  $scope.$on('authenticationService::authenticationChanged', function(event, isLoggedOn) {
   $scope.view.show = isLoggedOn;
	$scope.view.position = 'left';
	
  });

  $scope.selectedIndex = 0;
	$scope.navigationItems = [

    {navId:1, phoneshow:1,action:"showView",url:"/", text:"Home",classname:"icon-home icon-2x "},
    {navId:2, phoneshow:2,action:"showStreamModal",url:"", text:"Add Stream",classname:"icon-plus icon-2x"},
	{navId:3, phoneshow:0,action:"showView",url:"/search", text:"Search",classname:"icon-search icon-2x"},
    {navId:4, phoneshow:0,action:"showView",url:"/settings", text:"Settings",classname:"icon-cog icon-2x"},
	{navId:5, phoneshow:0,action:"showView",url:"/information", text:"Informations",classname:"icon-info-sign icon-2x"},
	{navId:6, phoneshow:0,action:"showView",url:"/logout", text:"Logout",classname:"icon-off icon-2x"},


  ];

	$scope.hiddenMenusCounts=0;
	for(var i=0;i<$scope.navigationItems.length;i++){
		if($scope.navigationItems[i].phoneshow<=0){
			$scope.hiddenMenusCounts++;
		}
	}

	$scope.showHiddenMenu=function(){
		if($scope.showMenus==true){
			$scope.showMenus=false;
		}else{
			$scope.showMenus=true;
		}

	}

	$scope.fixedPhoneMenu = function (menuitem){
    var valid = true,
    // check mentor type
		valid=menuitem.phoneshow>0;
    return valid;
  };
	$scope.hiddenPhoneMenu = function (menuitem){
	
    var valid = true,
    // check mentor type
		valid=menuitem.phoneshow<=0;
    return valid;
  };

	$scope.callfunc = function(navId,action){
	 if($scope.isMobile){
			$scope.showMenus=false;
		}
		eval("$scope."+action+"("+navId+")");
	}
  $scope.showView = function(navId){
		for(var i=0;i<$scope.navigationItems.length;i++){
			if($scope.navigationItems[i].navId==navId){
				$scope.selectedIndex = i;
			}
		}
		if($scope.navigationItems[$scope.selectedIndex].url== '/logout')
		{
			$scope.logout();
		}
		else
		{
			$location.path($scope.navigationItems[$scope.selectedIndex].url);
		}
  };
	$scope.showStreamModal = function(navId){
	$scope.showAddModal=!$scope.showAddModal;
	if(!$scope.showAddModal){
		$scope.selected="";
		}
  };
  $scope.selectedStyle = function(navId){
    return $scope.navigationItems[$scope.selectedIndex].navId === navId ? 'nav-bar-left-active':'';
  };
	$scope.closemodal=function(){
		$scope.showAddModal=false;
		$scope.selected="";
	}
	$scope.selectstream=function(streamname){
	$scope.showAddModal=false;
		streamModel.addByChannelName(streamname);
		$scope.selected="";
	}
	$scope.selectsecurity=function(securityname){
		streamModel.addByChannelName(securityname);
		$scope.selected="";
	}

	$scope.getHeight=function(){
	  var myWidth = 0, myHeight = 0;
	  if( typeof( window.innerWidth ) == 'number' ) {
	    //Non-IE
	    myWidth = window.innerWidth;
	    myHeight = window.innerHeight;
	  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
	    //IE 6+ in 'standards compliant mode'
	    myWidth = document.documentElement.clientWidth;
	    myHeight = document.documentElement.clientHeight;
	  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
	    //IE 4 compatible
	    myWidth = document.body.clientWidth;
	    myHeight = document.body.clientHeight;
	  }
		return myHeight;
	};

	$scope.getWidth=function(){
	  var myWidth = 0, myHeight = 0;
	  if( typeof( window.innerWidth ) == 'number' ) {
	    //Non-IE
	    myWidth = window.innerWidth;
	    myHeight = window.innerHeight;
	  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
	    //IE 6+ in 'standards compliant mode'
	    myWidth = document.documentElement.clientWidth;
	    myHeight = document.documentElement.clientHeight;
	  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
	    //IE 4 compatible
	    myWidth = document.body.clientWidth;
	    myHeight = document.body.clientHeight;
	  }
		return myWidth;
	};
	$scope.$watch($scope.getWidth, function(newValue, oldValue){
		if(newValue>=768){
			$scope.isMobile=false;
		}else{
			$scope.isMobile=true;
		}
	});
	$scope.$watch($scope.getHeight, function(newValue, oldValue){
		$scope.style=function(){
			return {
				height:(newValue-52)+'px'
			};
		};
	});
	w.bind('resize',function(){
		$scope.$apply();
	});
	
	$scope.logout = function() {
	   sessionModel.unset('auth_token');
       sessionModel.set('authenticated', false);
       sessionModel.unset('user_id');
       sessionModel.unset('is_admin');
       sessionModel.unset('is_cleaner');
	  $('#sp-nav').remove();
	   $('#nav-top').remove();
	    localStorage.i=0;			
	   $location.path('/login');

	   document.getElementById("nav-bar-left").style.display='none';


  };

});
