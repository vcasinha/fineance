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