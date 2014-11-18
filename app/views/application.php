<!doctype html>
<html>
	<head>
		<link rel="stylesheet" type="text/css" href="/bower_components/bootstrap/dist/css/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" href="/bower_components/angular-ui/build/angular-ui.min.css">
		<link rel="stylesheet" type="text/css" href="/app/css/theme3.css">
		<link rel="stylesheet" type="text/css" href="/app/css/style.css">
		<link rel="stylesheet" href="/bower_components/nvd3/nv.d3.css"/>
	</head>
	<body ng-app="fineance">
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
<!-- 		<script src="/bower_components/d3/d3.js"></script> -->
		<script src="/d3.v2.min.js"></script>
		<script src="/bower_components/nvd3/nv.d3.js"></script>
		<script src="/bower_components/bootstrap/dist/js/bootstrap.js"></script>
		<script src="/bower_components/angular/angular.min.js"></script>
		<script src="/bower_components/angular-ui/build/angular-ui.min.js"></script>
		<script src="/bower_components/angular-bootstrap/ui-bootstrap.min.js"></script>
		<script src="/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js"></script>
		<script src="/bower_components/angular-ui-router/release/angular-ui-router.min.js"></script>
		<script src="/bower_components/angular-resource/angular-resource.min.js"></script>
		<script src="/bower_components/momentjs/min/moment.min.js"></script>
		<script src="/bower_components/angularjs-nvd3-directives/dist/angularjs-nvd3-directives.js"></script>
		<script src="/app/main.js"></script>
		<script src="/app/lib/services.js"></script>
		<script src="/app/lib/factories.js"></script>
		<script src="/app/lib/directives.js"></script>
		<script src="/app/controllers/account.js"></script>
		<script src="/app/controllers/transaction.js"></script>
		<script src="/app/controllers/category.js"></script>
		<script src="/app/controllers/group.js"></script>
		<script src="/app/controllers/statistics.js"></script>
		<script src="/app/controllers/pages.js"></script>
	</body>
</html>