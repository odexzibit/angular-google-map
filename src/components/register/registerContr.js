import authService from "../../services/authService";

export default function AuthController($scope, authService){
	$scope.credentials = {
		"name": "",
		"email": "",
		"username": "",
		"password": ""
	};
	$scope.register	 = function(){
		authService.register($scope.credentials);
	}
}

