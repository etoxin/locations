

// pages
angular.module('locations', []).
	config(function($routeProvider) {
		$routeProvider.
			when('/', {controller:GalleryCtrl, templateUrl:'/partials/home.html'}).
			otherwise({redirectTo:'/'});
	}).
	directive('mediaItemDirective', function() {
	  return {
	  	controller: function ($scope) {
			if($scope.$last){
				console.log('Ready!');
				console.log( $('#item-bedlam_bay').height() );
			}			
	  	},
	  	template:
	  		'<div id="item-{{item.name}}" class="location-item">'+
			'	<h2>{{item.name}}</h2>'+
			'	<img src="{{item.imagePath}}" alt="{{item.name}}" width="100%">'+
			'	<audio src="{{item.audioPath}}" id="audio-{{item.name}}" controls loop>'+
			'		<p>Your browser does not support the audio element. Please upgrade.</p>'+
			'	</audio>'+
			'</div>'
	  };
	});


function GalleryCtrl($scope, $http) {
	$scope.audio = function () {
		var items = $('.location-item');
		console.log(items);
		$.each( items, function(index, value) {
		  // console.log(value);
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



	// var item = $('#item--medowbank'),
	// 	scrollPosition = $('body').scrollTop(),
	// 	itemPosition = $(item).offset(),
	// 	itemHeight = item.height();
	// if( scrollPosition >= itemPosition.top && scrollPosition <= (itemPosition.top + itemHeight) ){
	// 	document.getElementById('audio-medowbank').play();
	// }
	// if( scrollPosition < itemPosition.top || scrollPosition > (itemPosition.top + itemHeight) ){
	// 	document.getElementById('audio-medowbank').pause();
	// }


}













