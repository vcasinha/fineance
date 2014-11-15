var app = angular.module('fineance.pages', []);

app.config(['$stateProvider', '$urlRouterProvider', 
function ($stateProvider,   $urlRouterProvider) {
	console.log("page.config");
	$stateProvider
		.state('home', {
			url: '/frontpage',
			templateUrl: 'app/html/pages/frontpage.html',
			controller: 'FrontpageController'
		})
		.state('page', {
			url: '/page/:id',
			templateUrl: 'app/html/page/page.html',
			controller: 'PageController'
		});
}]);

app.controller('FrontpageController', [
		'$scope', 
		function ($scope) {
			console.log("page.frontpage", "loaded");
		}
	]);
