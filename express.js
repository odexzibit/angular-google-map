//  set up =======================

const express = require('express');
const cors = require('cors'); 
const bodyParser = require('body-parser'); 
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./database');
const users = require('./router/users');
const port = process.env.PORT || 3000;

// configuration =====================

mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
	console.log("Connected to database " + config.database);
})

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false}));

app.use(passport.initialize());

app.use('/users', users);

// app.get('/', function(req, res){
// 	res.sendFile('index.html');
// });

app.listen(port);
console.log('App listening on port ' + port);

