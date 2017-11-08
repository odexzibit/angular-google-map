require('angular');
// import '../css/app.less'; 
import uirouter from 'angular-ui-router';
import routing from './app.routes.js';
import register from './components/register/register.routes';
import authenticate from './components/authenticate/auhenticateRoute';
import main from './components/main_page/main.js';
import about from './components/about_author/about_author.js';
import authService from './services/authService';
import mapService from './services/mapService';

angular.module('app', [uirouter, register, main, authenticate, about])
  .config(routing)
  .factory('authService', authService)
  .factory('mapService', mapService)
  .run(['$rootScope', function ($rootScope){
	$rootScope.isAuthenticated = false;
	$rootScope.globals = localStorage.getItem('user');
	if ($rootScope.globals){
		$rootScope.isAuthenticated = true;
		console.log($rootScope.isAuthenticated);
	} else {
		$rootScope.isAuthenticated = false;
		window.location.href = '/#!/authenticate';
	}
}]);



