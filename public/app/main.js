var modules = [
	'ngResource', 
	'ui.router', 
	'ui.bootstrap',
	'nvd3ChartDirectives',
	'fineance.services',
	'fineance.extensions',
	'fineance.directives',
	'fineance.transaction',
	'fineance.category',
	'fineance.group',
	'fineance.statistics'
];
	
var app = angular.module('fineance', modules);

app.config(['$stateProvider', '$urlRouterProvider', '$resourceProvider', function ($stateProvider,   $urlRouterProvider, $resourceProvider) {
	$resourceProvider.defaults.stripTrailingSlashes = false;
	
	$urlRouterProvider
        // The `when` method says if the url is ever the 1st param, then redirect to the 2nd param
        // Here we are just setting up some convenience urls.
        .when('/c?id', '/contacts/:id')
        .when('/user/:id', '/contacts/:id')

        // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
        .otherwise('/');
	
	$stateProvider
        .state("home", {
          // Use a url of "/" to set a state as the "index".
          url: "/",

          // Example of an inline template string. By default, templates
          // will populate the ui-view within the parent state's template.
          // For top level states, like this one, the parent template is
          // the index.html file. So this template will be inserted into the
          // ui-view within index.html.
          template: '<p class="lead">Welcome to the UI-Router Demo</p>' +
            '<p>Use the menu above to navigate. ' +
            'Pay attention to the <code>$state</code> and <code>$stateParams</code> values below.</p>' +
            '<p>Click these links—<a href="#/c?id=1">Alice</a> or ' +
            '<a href="#/user/42">Bob</a>—to see a url redirect in action.</p>'

        });
}]);

app.directive('focus', function() {
	return function($scope, elem, attr) {
		elem[0].focus();
		$scope.$on(attr.focus, function(e) {
			elem[0].focus();
		});
	};
});
