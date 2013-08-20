angular.module('locations', []).
  config(function($routeProvider) {
    $routeProvider.
      when('/', {controller:GalleryCtrl, templateUrl:'/partials/home.html'}).
      otherwise({redirectTo:'/'});
  });


function GalleryCtrl($scope, Projects) {
  //$scope.locations = Projects;
}