export default function mapService($http){
	let service = {};
	service.saveMarkers = function(credentials, callback){
		$http.put('http://127.0.0.1:3000/users/savemarkers', credentials)
		.then(function(data){  console.log('Success'); }, function(data){ console.log('Error')});
	};
	service.showMarkers = function(){
		return $http.get('http://127.0.0.1:3000/users/showmarkers');
    }
	return service;
}