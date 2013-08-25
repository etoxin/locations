angular.module('locations', []).
  config(function($routeProvider) {
    $routeProvider.
      when('/', {controller:GalleryCtrl, templateUrl:'/partials/home.html'}).
      otherwise({redirectTo:'/'});
  });


function GalleryCtrl($scope, $http) {
  // get the elements
  $http({method: 'GET', url: '/api/locations'}).
  success(function(data, status, headers, config) {
  	$scope.data = data;
  	console.log($scope.data);
  }).
  error(function(data, status, headers, config) {
  	$scope.status = status;
  });

  var audioPlaying = false;

  window.onscroll = function (oEvent) {
  	var item = $('#item-medowbank');
  	var scrollPosition = $('body').scrollTop();
  	var itemPosition = item.offset();
  	var itemHeight = item.height();

	console.log('scroll position '+scrollPosition);
	console.log('item position: '+itemPosition.top);
	
	if( scrollPosition >= itemPosition.top && scrollPosition <= (itemPosition.top + itemHeight) ){
		document.getElementById('audio-medowbank').play();
	}
  }
}