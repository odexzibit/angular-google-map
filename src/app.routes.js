routing.$inject = ['$urlRouterProvider', '$locationProvider', '$qProvider'];

export default function routing($urlRouterProvider, $locationProvider, $qProvider){
    // $locationProvider.html5Mode(true); 
	$urlRouterProvider.otherwise('/');
	$qProvider.errorOnUnhandledRejections(false);
	
}