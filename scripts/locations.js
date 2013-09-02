

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
	  		$scope.active = true;
	  		$scope.audio = {'playing': false, 'Volume': 1};
	  		$scope.yPosition = {'start': 0, 'end': 0};
	  		console.log($scope);
	  	},
	  	template:
	  		'<div id="item-{{item.name}}" class="location-item" audio-mixer>'+
			'	<h2>{{item.name}}</h2>'+
			'	<img src="{{item.imagePath}}" alt="{{item.name}}" width="100%">'+
			'	<audio src="{{item.audioPath}}" id="audio-{{item.name}}" loop>'+
			'		<p>Your browser does not support the audio element. Please upgrade.</p>'+
			'	</audio>'+
			'</div>'
	  };
	}).
	directive('audioMixer', function () {
		return function ($scope, element, attrs) {
			$(window).scroll(function() {
				var	elementPosition = element.offset(),
					elementHeight = element.height(),
					browserHeight = $(window).height(),
					scrollPosition = $('body').scrollTop(),
					sound = document.getElementById('audio-'+$scope.item.name),
					viewportCenter = scrollPosition + (browserHeight / 2);

				if( viewportCenter >= elementPosition.top && viewportCenter <= (elementPosition.top + elementHeight)){
					sound.play();
					if($scope.audio.Volume < 1){
						$scope.audio.Volume += 0.07;
						sound.volume  = $scope.audio.Volume.toFixed(1);						
					}
					$scope.audio.playing = true;
				}

				if( viewportCenter < elementPosition.top || viewportCenter > (elementPosition.top + elementHeight) && $scope.audio.playing == true){
					if($scope.audio.Volume > 0){
						$scope.audio.Volume -= 0.07;
						sound.volume  = $scope.audio.Volume.toFixed(1);						
					}
				}	
			});

		}
	});

function GalleryCtrl($scope, $http) {
	$scope.audio = function () {
		var items = $('.location-item');
		console.log(items);
		$.each( items, function(index, value) {
		  console.log('value');
		});
	}

	// populate the page
	$http({method: 'GET', url: '/api/locations'}).
	success(function(data, status, headers, config) {
		$scope.locationItem = data;
		$.each($scope.locationItem, function (key, value) {
			var newItems = {
				'inDom': false
			}
			$.extend(value, newItems);
		});
	}).
	error(function(data, status, headers, config) {
		$scope.status = status;
	});

}













