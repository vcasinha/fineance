<!doctype html>
<html>
	<head>
		<link rel="stylesheet" type="text/css" href="/bower_components/bootstrap/dist/css/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" href="/bower_components/bootstrap/dist/css/bootstrap-theme.min.css">
		<link rel="stylesheet" type="text/css" href="/bower_components/angular-ui/build/angular-ui.min.css">
	</head>
	<body ng-app="fineance">
		<div class="container">
		    <div class="row">
		        <div class="col-xs-12">
		            <a ui-sref="home">Home</a>
                    <a ui-sref="transaction-index">Transactions</a>
		        </div>
		    </div>
		    <div class="row" ui-view></div>
		</div>
		
		<!-- Scripts -->
		<script src="/bower_components/jquery/dist/jquery.min.js"></script>
		<script src="/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
		<script src="/bower_components/angular/angular.min.js"></script>
		<script src="/bower_components/angular-ui/build/angular-ui.min.js"></script>
		<script src="/bower_components/angular-ui-router/release/angular-ui-router.min.js"></script>
		<script src="/bower_components/angular-resource/angular-resource.min.js"></script>
		<script src="/app/main.js"></script>
		<script src="/app/transactions.js"></script>

	</body>
</html>