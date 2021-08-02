angular.module("sop").controller("searchTodosUsuariosTestCtrl", function($scope, $state, $stateParams, $cookies, $state, servicosAPI){
	
	if($cookies.get('token')){
		$scope.nome = $cookies.get('nome');
	}

	servicosAPI.validaLogin($cookies.get('token')).then(function (result) {
		console.log('Logado');
	}).catch(function(err, status){
		if(err.status == '401'){
			$state.go('inicio');
		}
	});
	
	$scope.text = $stateParams.text;
	$scope.pag = 1;
	$scope.apa = true;
	var cupons = [];
	
	servicosAPI.searchTodosUsuariosTest($scope.pag, $scope.text).then(function(result){
		console.log(result.data);
		for(var i=0; i<result.data.data.length; i++){
			cupons.push(result.data.data[i]);
		}
		
		$scope.maisPag = function(){
			$scope.apa = false;
			$scope.pag += 1;
			servicosAPI.searchTodosUsuariosTest($scope.pag, $scope.text).then(function(result){
				console.log(result.data.data);
				for(var i=0; i<result.data.data.length; i++){
					cupons.push(result.data.data[i]);
					$scope.apa = true;
				}
				
				if($scope.pag == result.data.last_page){
					$scope.parou = true;
				};
			});
		};

		$scope.cupons = cupons;
	});

	$scope.enter = function(event){
		if(window.event.keyCode == 13){
			console.log('enter');
			$scope.buscar();
		}
	};

	$scope.buscar = function(){
		if($scope.buscando){
			$state.go('search-todos-usuarios-test', {text:$scope.buscando});
		}
	}
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});