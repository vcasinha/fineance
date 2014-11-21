var app = angular.module('fineance.account.factory', []);

app.factory('Account', ['API', 
function(API) {
	var collection_options = {
		name: 'Account',
		url: '/api/account/:id'
	};

	return API.collection(collection_options);
}]);
