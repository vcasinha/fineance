var app = angular.module('fineance.factories', ['ui.router', 'ui.bootstrap']);

app.factory('Transaction', ['$resource', function($resource) {
	return $resource('/api/transaction/:id', {id:'@id'},
    {
	    'index' : { method: 'GET', isArray: true },
        'update': { method: 'PUT' },
        'query' : { method: 'GET', params:{ paginate:true } }
    });
}]);

app.factory('Category', ['$resource', function($resource) {
	return $resource('/api/category/:id', {id:'@id'},
    {
	    'index' : { method: 'GET', isArray: true, params:{ order:{ name:'asc' } } },
        'update': { method: 'PUT' },
        'query' : { method: 'GET', params:{ paginate:true } }
    });
}]);

app.factory('Group', ['$resource', function($resource) {
	return $resource('/api/group/:id', {id:'@id'},
    {
	    'index' : { method: 'GET', isArray: true },
        'update': { method: 'PUT' },
        'query' : { method: 'GET', params:{ paginate:true } }
    });
}]);

app.factory('GroupCategory', ['$resource', function($resource) {
	return $resource('/api/group/:group_id/category/:id', {group_id: '@group_id', id:'@id'},
    {
	    'index' : { method: 'GET', isArray: true },
        'update': { method: 'PUT' },
        'query' : { method: 'GET', params:{ paginate:true } }
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
		},
		'groups': {
			method: 'GET',
			url: 'api/group/summary/year/:year',
			isArray: true,
		}
	};

	return $resource('/api/stats/summary/:period', params, options);
}]);