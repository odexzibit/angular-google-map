export default function authService($http, $window,  $location, $rootScope, $timeout){
	let service = {};
	let LOCAL_TOKEN_KEY = 'awesomeKey';
	let isAuthenticated = false;
	let authToken;

	function loadUserCredentials(){
		var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
		if (token){
			useCredentials(token);
		}
	}
	function useCredentials(token){
		isAuthenticated = true;
		authToken = token;
		$http.defaults.headers.common.Authorization = authToken;
	}
	function storeUserCredentials(token, user, markers){
		window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
		localStorage.setItem('user', JSON.stringify(user));
		useCredentials(token);
	}
	function destroyUserCredentials(){
		authToken = undefined;
		isAuthenticated = false;
		$http.defaults.headers.common.Authorization = undefined;
		window.localStorage.removeItem(LOCAL_TOKEN_KEY);
		localStorage.removeItem('user');
	}
	service.register = function(credentials, callback){
		$http.post('http://127.0.0.1:3000/users/register', credentials, { headers:{'Content-Type':"application/json"}})
		.then(function(response){  
			if (response.data.success){
				console.log(response.data.success);
				window.location.href = '/#!/authenticate';
			} else {
				console.log(";(");
			}	
		});
	}
	service.toRegister = function(){
		location.href = '/#!/register';
	}
	service.authenticate = function(data){
		$http.post('http://127.0.0.1:3000/users/authenticate', data)
		.then(function(result){
			if(result.data.success){
				$rootScope.isAuthenticated = true;
				storeUserCredentials(result.data.token, result.data.user.name, result.data.user.markers);
				window.location.href = '/#!/main';
				// var user_id = result.data.user._id;
				// console.log(user_id);
			} else { console.log('Failed'); }
		})
	};
	service.saveMarkers = function(credentials, callback){
		$http.put('http://127.0.0.1:3000/users/savemarkers', credentials)
		.then(function(data){  console.log('=)'); }, function(data){ console.log(':(')});
	};
	service.test = function(){
		console.log("Great!!!!");
	};
	let markersHeader = {
		headers : { 
			"authorization" : "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1OWFhOGQ1NTk0ZTdlNDFhYjQxMTJhM2MiLCJuYW1lIjoi0YTRi9GLIiwiZW1haWwiOiLRhNGL0YsiLCJ1c2VybmFtZSI6ItGG0LnRhtC5IiwicGFzc3dvcmQiOiLRhtC50YbRhiIsIl9fdiI6MCwibWFya2VycyI6W1s0Ni40NDU0ODY2Mzg0MjIyNSwzMC42OTE3NjY3Mzg4OTE2XSxbNDYuNDUxNTc3ODM2OTQwMzksMzAuNjgyNjY4Njg1OTEzMDg2XV0sImxvY2F0aW9ucyI6W1s0Ni40NDk2ODU0OTg2ODg0OTUsMzAuNzAxOTgwNTkwODIwMzEyXSxbNDYuNDUyNzAxMzgxNjY5NjUsMzAuNzE5MzE4Mzg5ODkyNTc4XSxbNDYuNDU2MTkwMTM1OTg2NDgsMzAuNzA5NjE5NTIyMDk0NzI3XSxbNDYuNDYzODc2NDMzMDA4NTE1LDMwLjcyMjIzNjYzMzMwMDc4XV19.xqOjqMqfg1fHGHGzv5ZvMb0JbzXtxhh_dr1bdcpBoOQ" 
		}
	};
	// service.logout = function(){
	// 	console.log($rootScope.isAuthenticated);
	// };
	$rootScope.logout = function(){
		$rootScope.isAuthenticated = false;
		destroyUserCredentials();
	}

	loadUserCredentials();

	return service;
}

