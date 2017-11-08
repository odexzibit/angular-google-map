import authService from "../../services/authService";

export default function AuthController($scope, $location, authService, $rootScope){
	$scope.credentials = {
		"email": "",
		"password": ""
	}
	$scope.authenticate = function(){
		authService.authenticate($scope.credentials);
	}
	$scope.register = function(){
		authService.toRegister();
	}
}