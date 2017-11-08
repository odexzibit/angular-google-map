import './register.less';
import AuthController from './registerContr.js';

routes.$inject = ['$stateProvider'];
export default function routes($stateProvider){
	$stateProvider
		.state('authorization', {
			url: '/register',
			template: require('./register.html'),
			controller: AuthController
		});
}