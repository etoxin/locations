

// pages
angular.module('locations', []).
	config(function($routeProvider) {
		$routeProvider.
			when('/', {controller:GalleryCtrl, templateUrl:'/partials/home.html'}).
			otherwise({redirectTo:'/'});
	});


function GalleryCtrl($scope, $http) {
	//define vars

	$scope.audio = function () {
		var items = $('.location-item');
		$.each( items, function(index, value) {
		  console.log(value);
		});
	}


	// get the elements from feed
	$http({method: 'GET', url: '/api/locations'}).
	success(function(data, status, headers, config) {
		$scope.locationItem = data;
		$scope.audio();
	}).
	error(function(data, status, headers, config) {
		$scope.status = status;
	});





	// run onscroll
	window.onscroll = function (oEvent) {
		var item = $('#item-medowbank'),
			scrollPosition = $('body').scrollTop(),
			itemPosition = item.offset(),
			itemHeight = item.height();

		// console.log('scroll position '+scrollPosition);
		// console.log('item position: '+itemPosition.top);
		
		if( scrollPosition >= itemPosition.top && scrollPosition <= (itemPosition.top + itemHeight) ){
			document.getElementById('audio-medowbank').play();
		}
	}
}