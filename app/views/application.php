<!doctype html>
<html>
	<head>
		<link rel="stylesheet" type="text/css" href="/bower_components/bootstrap/dist/css/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" href="/bower_components/angular-ui/build/angular-ui.min.css">
		<link rel="stylesheet" type="text/css" href="/app/css/theme2.css">
		<link rel="stylesheet" type="text/css" href="/app/css/style.css">
		<link rel="stylesheet" href="/bower_components/nvd3/nv.d3.css"/>
		<title>Fine-ance</title>
	</head>
	<body ng-app="fineance" ng-cloak>
		<div class="container-fluid" style="margin-top:5px;">
			<div class="row">
				<div class="col-12-xs">
					<nav class="navbar navbar-default" navigation></nav>
				</div>
			</div>
		</div>
		<!-- Main view -->
		<div class="container-fluid" ui-view></div>
		<div class="container">
			<div class="row">
				<div class="col-12-xs"><div class="small">{{app.name}} {{app.version}}</div></div>
			</div>
		</div>
		
		<!-- Scripts -->
		<script src="/bower_components/jquery/dist/jquery.min.js"></script>
		<script src="/bower_components/momentjs/min/moment.min.js"></script>
		<script src="/bower_components/angular/angular.min.js"></script>

		<script src="/d3.v2.min.js"></script>
		<script src="/bower_components/nvd3/nv.d3.js"></script>
		<script src="/bower_components/bootstrap/dist/js/bootstrap.js"></script>

		<!-- Angular modules -->
		<script src="/bower_components/angular-ui/build/angular-ui.js"></script>
		<script src="/bower_components/angular-bootstrap/ui-bootstrap.js"></script>
		<script src="/bower_components/angular-bootstrap/ui-bootstrap-tpls.js"></script>
		<script src="/bower_components/angular-ui-router/release/angular-ui-router.js"></script>
		<script src="/bower_components/angular-resource/angular-resource.js"></script>
		<script src="/bower_components/angular-cached-resource/angular-cached-resource.js"></script>
		<script src="/bower_components/angularjs-nvd3-directives/dist/angularjs-nvd3-directives.js"></script>
		<script src="/bower_components/angular-nvd3/dist/angular-nvd3.js"></script>

		<!-- Application -->
		<script src="/app/main.js"></script>
		<script src="/app/lib/services.js"></script>
		<script src="/app/lib/factories.js"></script>
		<script src="/app/lib/directives.js"></script>
		<script src="/app/lib/oo/table.js"></script>
		<!-- Modules -->
		<script src="/app/modules/account/account.controllers.js"></script>
		<script src="/app/modules/account/account.factories.js"></script>
		<script src="/app/modules/category/category.controllers.js"></script>
		<script src="/app/modules/category/category.factories.js"></script>
		<script src="/app/modules/group/group.controllers.js"></script>
		<script src="/app/modules/group/group.factories.js"></script>
		<script src="/app/modules/page/page.controllers.js"></script>
		<script src="/app/modules/page/page.factories.js"></script>
		<script src="/app/modules/statistics/statistics.controllers.js"></script>
		<script src="/app/modules/statistics/statistics.factories.js"></script>
		<script src="/app/modules/transaction/transaction.controllers.js"></script>
		<script src="/app/modules/transaction/transaction.factories.js"></script>
	</body>
</html>
