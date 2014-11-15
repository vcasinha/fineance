<!doctype html>
<html>
	<head>
		<link rel="stylesheet" type="text/css" href="/bower_components/bootstrap/dist/css/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" href="/bower_components/bootstrap/dist/css/bootstrap-theme.min.css">
		<link rel="stylesheet" type="text/css" href="/bower_components/angular-ui/build/angular-ui.min.css">
		<link rel="stylesheet" type="text/css" href="/app/css/style.css">
		<link rel="stylesheet" href="/bower_components/nvd3/nv.d3.css"/>
	</head>
	<body ng-app="fineance">
		<div class="container">
			<div class="col-6-xs">
				<nav class="navbar navbar-default" navigation></nav>
			</div>
		
			<div role="tabpanel">
			
			  <!-- Nav tabs -->
			  <ul class="nav nav-tabs" role="tablist">
			    <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Checking account</a></li>
			    <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Profile</a></li>
			    <li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">Messages</a></li>
			    <li role="presentation"><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">Settings</a></li>
			    <li role="presentation"><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab"><i class="glyphicon glyphicon-plus"></i></a></li>
			  </ul>
			
			  <!-- Tab panes -->
			  <div class="tab-content">
			    <div role="tabpanel" class="tab-pane active" id="home">a</div>
			    <div role="tabpanel" class="tab-pane" id="profile">b</div>
			    <div role="tabpanel" class="tab-pane" id="messages">c</div>
			    <div role="tabpanel" class="tab-pane" id="settings">d</div>
			  </div>
			
			</div>
		</div>
		<!-- Main view -->
		<div class="container" ui-view></div>
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