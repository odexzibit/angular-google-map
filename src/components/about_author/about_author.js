export default function about($stateProvider){
	$stateProvider
		.state('about', {
			url: '/about',
			template: require('./about_author.html')
		});
}