import './main.less';
import testController from './mainContrl'


main.$inject = ['$stateProvider'];
export default function main($stateProvider){
    $stateProvider
        .state('main', {
            url: '/main',
            template: require('./main.html'),
            controller : testController
        });
}