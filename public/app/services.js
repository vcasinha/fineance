var app = angular.module('fineance.services', ['ui.router', 'ui.bootstrap']);

app.factory('Transaction', ['$resource', function($resource) {
	return $resource('/api/transaction/:id', {id:'@id'},
    {
        'update': { method:'PUT' }
    });
}]);

app.factory('Category', ['$resource', function($resource) {
	return $resource('/api/category/:id', {id:'@id'},
    {
        'update': { method:'PUT' }
    });
}]);

app.factory('Group', ['$resource', function($resource) {
	return $resource('/api/group/:id', {id:'@id'},
    {
        'update': { method:'PUT' }
    });
}]);

app.factory('GroupCategory', ['$resource', function($resource) {
	return $resource('/api/group/:group_id/category/:id', {group_id: '@group_id', id:'@id'},
    {
        'update': { method:'PUT' }
    });
}]);

app.factory('Stats', ['$resource', 
function($resource){
	var params = {
		period: '@period',
	};
	
	var options = {
		'index': {
			method: 'GET',
			url: '/api/stats/summary/:period',
			isArray: true
		},
		'categories': {
			method: 'GET',
			url: '/api/categories/summary/period/:period',
			isArray: true
		}
	};
	
	return $resource('/api/stats/summary/:period', params, options);	
}]);