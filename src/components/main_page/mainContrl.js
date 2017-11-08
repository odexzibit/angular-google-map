import gmap from 'google-maps';
// import authService from '../authorization/testService';
import mapService from '../../services/mapService';

export default function mapController($scope, $window, $http, authService, mapService){
  $scope.msg = "I love London";

  gmap.KEY = 'AIzaSyDaT9dUsoG56-8jxi4HDq_aQqG22GN6CYU';
  
  gmap.LIBRARIES = ["places"];
  gmap.LANGUAGE = 'en';

  window.navigator.geolocation.getCurrentPosition(function(position){
    var lat =  position.coords.latitude;
    var lng = position.coords.longitude;
    gmap.load(function(google) {	  	
     var center =  { lat: lat, lng: lng };
     var options = {
      zoom: 14,
      center:  center   
    }
    var map = new google.maps.Map(document.getElementById('map'), options);

    var me = new google.maps.Marker({
      position: center,
      map: map

    });

    map.addListener('click', function(e) {
      placeMarkerAndPanTo(e.latLng, map);
    });
    var markers = [];
    function placeMarkerAndPanTo(latLng, map) { 
     var marker = new google.maps.Marker({
      position: latLng,
      map: map,
      draggable: true,
      animation: google.maps.Animation.DROP
    });
     var markLat = marker.getPosition().lat();
     var markLng = marker.getPosition().lng();
     var markCoord = [markLat, markLng];
     markers.push(markCoord);
     console.log('mark latitude : ' + markLat + ", mark longitude : " +  markLng);
     map.panTo(latLng);
     var markersLocalStorage = markers;
 }
   $scope.credentials = markers;
   $scope.send = function(){
    // console.log(markers);
    mapService.saveMarkers($scope.credentials);
  }
  let markersHeader = {
    headers : { 
      "authorization" : "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1OWFhOGQ1NTk0ZTdlNDFhYjQxMTJhM2MiLCJuYW1lIjoi0YTRi9GLIiwiZW1haWwiOiLRhNGL0YsiLCJ1c2VybmFtZSI6ItGG0LnRhtC5IiwicGFzc3dvcmQiOiLRhtC50YbRhiIsIl9fdiI6MCwibWFya2VycyI6W1s0Ni40NDU0ODY2Mzg0MjIyNSwzMC42OTE3NjY3Mzg4OTE2XSxbNDYuNDUxNTc3ODM2OTQwMzksMzAuNjgyNjY4Njg1OTEzMDg2XV0sImxvY2F0aW9ucyI6W1s0Ni40NDk2ODU0OTg2ODg0OTUsMzAuNzAxOTgwNTkwODIwMzEyXSxbNDYuNDUyNzAxMzgxNjY5NjUsMzAuNzE5MzE4Mzg5ODkyNTc4XSxbNDYuNDU2MTkwMTM1OTg2NDgsMzAuNzA5NjE5NTIyMDk0NzI3XSxbNDYuNDYzODc2NDMzMDA4NTE1LDMwLjcyMjIzNjYzMzMwMDc4XV19.xqOjqMqfg1fHGHGzv5ZvMb0JbzXtxhh_dr1bdcpBoOQ" 
    }
  };

  $scope.show = function(){
    mapService.showMarkers().then(function(response){
      // console.log(response.data.user);
      var marks = response.data.user; 
      for(var i=0; i < marks.length; i++){
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(marks[i][0], marks[i][1]), // if array of arrays
          map: map,
          draggable: true
        });
      }
    })
  }

//                                   PLACE SEARCHES

$scope.pharm = function(){
  placeSearch('pharmacy', image.imagePharmacy);
}
$scope.gasStations = function(){
  placeSearch('gas_station', image.imageGasStation);
}
$scope.schools = function(){
  placeSearch('school', image.imageSchool);
}
$scope.restaurants = function(){
  placeSearch('restaurant', image.imageRestaurants);
}
var image = {
  imageRestaurants : {
    url: 'https://www.google.com.ua/maps/vt/icon/name=assets/icons/poi/quantum/container_background-2-medium.png,assets/icons/poi/quantum/container-2-medium.png,assets/icons/poi/quantum/restaurant-2-medium.png&highlight=ffffff,db4437,ffffff&color=ff000000?scale=1.100000023841858'
  },
  imageSchool : {
    url: 'https://www.google.com.ua/maps/vt/icon/name=assets/icons/poi/quantum/container_background-2-medium.png,assets/icons/poi/quantum/container-2-medium.png,assets/icons/poi/quantum/school-2-medium.png&highlight=ffffff,db4437,ffffff&color=ff000000?scale=1.100000023841858'
  },
  imagePharmacy : {
    url: 'https://www.google.com.ua/maps/vt/icon/name=assets/icons/poi/quantum/container_background-2-medium.png,assets/icons/poi/quantum/container-2-medium.png,assets/icons/poi/quantum/pharmacy-2-medium.png&highlight=ffffff,db4437,ffffff&color=ff000000?scale=1.100000023841858'
  },
  imageGasStation : {
    url: 'https://www.google.com.ua/maps/vt/icon/name=assets/icons/poi/quantum/container_background-2-medium.png,assets/icons/poi/quantum/container-2-medium.png,assets/icons/poi/quantum/gas-2-medium.png&highlight=ffffff,db4437,ffffff&color=ff000000?scale=1.100000023841858'
  }
}

function placeSearch(type, image){
  // var centr =  { lat: -33.867, lng: 151.195 };
  var centr =  { lat: lat, lng: lng };
  var options = {
    zoom: 14,
    center:  centr
  }
  var map = new google.maps.Map(document.getElementById('map'), options);
  var infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: centr,
    radius: 1000,
    type: type
  }, callback);
  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }

  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      icon: image
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }
}

});

// gmap.onLoad(function(google) {
//   console.log('I just loaded google maps api');
// });
})

}


