# angular-google-map
Application demonstrating integration with Google Maps. 
This project uses the MEAN stack:

* M - MongoDB
* E - ExpressJS - Server side application framework
* A - AngularJS - Client side application framework
* N - Node - Package manager

<img src="/testrecord5.gif" width="800px"/>

<img src="/testrecord7.gif" width="800px"/>

Other tools and technologies used:
* Mongoose - schema-based solution to model application data
* JSON Web Token - user authentication (jwt-simple)
* Bcryptjs - password encryption
* Passport - server side authentication
* CORS - Cross-origin resource sharing

### Start the application
Clone the angular-google-map repository  

then to grab the dependencies run

`npm install`

make sure MongoDB is running from your MongoDB directory with

`mongod`

use `nodemon` instead of `node` to run the code  

run the project with development mode

`npm run dev`

navigate to: http://localhost:8080

### Overview
* Map shows point of your geolocation
* Click on a map creates a marker
* When clicking on the save button all markers sending to the server(don't forget to authenticate)
* Show button – shows all markers saved before
* List with type of objects to be chosen (pharmacies, gas stations, schools,  restaurants) so click on the list item drawing markers on the map with the closest chosen objects


