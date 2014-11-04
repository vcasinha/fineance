<!doctype html>
<html>
	<head>
		<link rel="stylesheet" type="text/css" href="/bower_components/bootstrap/dist/css/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" href="/bower_components/bootstrap/dist/css/bootstrap-theme.min.css">
	</head>
	<body ng-app="fineance">
		<div class="container">
			<div class="row" ng-controller="frontController">
				<div class="col-xs-12">
					<ul>
						<li ng-repeat="p in transactions">
							<span>{{p.description}}</span>
							<p>{{p.amount}}</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<script src="/bower_components/jquery/dist/jquery.min.js"></script>
		<script src="/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
		<script src="/bower_components/angular/angular.min.js"></script>
		<script src="/bower_components/angular-route/angular-route.min.js"></script>
		<script src="/bower_components/angular-resource/angular-resource.min.js"></script>
		<script src="/app/main.js"></script>
	</body>
</html>