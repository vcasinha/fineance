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
		<nav class="navbar navbar-default" role="navigation">
			<div class="container-fluid">
			    <!-- Brand and toggle get grouped for better mobile display -->
			    <div class="navbar-header">
			    	<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
				        <span class="sr-only">Toggle navigation</span>
				        <span class="icon-bar"></span>
				        <span class="icon-bar"></span>
				        <span class="icon-bar"></span>
					</button>
					<a class="navbar-brand" ui-sref="home">Fineance</a>
			    </div>

			    <!-- Collect the nav links, forms, and other content for toggling -->
			    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			    	<ul class="nav navbar-nav">
						<li><a ui-sref="transaction">Transactions</a></li>
				        <li><a ui-sref="category">Categories</a></li>
				        <li><a ui-sref="group">Groups</a></li>
				        <li><a ui-sref="stats">Stats</a></li>
				        <li class="dropdown">
				        	<a href="#" class="dropdown-toggle" data-toggle="dropdown">Misc <span class="caret"></span></a>
							<ul class="dropdown-menu" role="menu">
				            	<li><a ui-sref="a">Index</a></li>
					            <li class="divider"></li>
					            <li><a href="#">Separated link</a></li>
					            <li class="divider"></li>
					            <li><a href="#">One more separated link</a></li>
				        	</ul>
				        </li>
			      	</ul>

			      	<!-- Search -->
				  	<form class="navbar-form navbar-left" role="search">
				        <div class="form-group">
				        	<input type="text" class="form-control" placeholder="Search">
				        </div>
						<button type="submit" class="btn btn-default">Submit</button>
			      	</form>

			      	<!-- Right options -->
				  	<ul class="nav navbar-nav navbar-right">
				        <li><a href="#">Link</a></li>
				        <li class="dropdown">
				        	<a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <span class="caret"></span></a>
							<ul class="dropdown-menu" role="menu">
					            <li><a href="#">Action</a></li>
					            <li><a href="#">Another action</a></li>
					            <li><a href="#">Something else here</a></li>
					            <li class="divider"></li>
					            <li><a href="#">Separated link</a></li>
				          	</ul>
				        </li>
			      	</ul>
			    </div><!-- /.navbar-collapse -->
			</div><!-- /.container-fluid -->
		</nav>

		<!-- Main view -->
		<div class="container" ui-view></div>

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
		<script src="/app/directives.js"></script>
		<script src="/app/transaction.js"></script>
		<script src="/app/category.js"></script>
		<script src="/app/extensions.js"></script>
		<script src="/app/group.js"></script>
		<script src="/app/services.js"></script>
		<script src="/app/statistics.js"></script>
	</body>
</html>