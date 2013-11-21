requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        angular: '/js/bower_components/angular/angular',
        jquery: '/js/bower_components/jquery/jquery',
    }
});
require(['jquery', 'angular'], function(angular) {
	require(['locations'], function(locations) {
	// meh...
	});
});