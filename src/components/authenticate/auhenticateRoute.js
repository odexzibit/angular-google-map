import authenticat from "./authenticateContr";

export default function authenticate($stateProvider){
    $stateProvider
        .state('authenticate', {
            url: '/authenticate',
            template: require('./auhenticate.html'),
            controller: authenticat
        });
}