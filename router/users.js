const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
// const mongoose = require('mongoose');
const config = require('../database');
const User = require("./userSchema");
const passport = require('passport');
require('../passport')(passport);
const jwt = require('jwt-simple');


router.get('/showmarkers', function(req, res){
	var token = getToken(req.headers.authorization);
	if (token) {
		var decoded = jwt.decode(token, config.secret);
		User.findOne({
			name : decoded.name
		}, function(err, user){
			if (err) throw err;
			if (!user) {
				return res.status(403).send({ success: false, msg: "Authentication failde. User not found."});	
			} else {
				res.json({success : true, msg: "Welcome in the member area " + user.name + "!", user : user.markers});
			}
		});
	}
})
getToken = function(headers){
	var parted = headers.split(' ');
	if (parted.length === 2){
		return parted[1];
	} else { return null; }
}

router.put('/savemarkers', function(req, res){
	var token = getToken(req.headers.authorization);
	var decoded = jwt.decode(token, config.secret);
	User.findOneAndUpdate({
		_id: decoded._id
	}, 
	{ $pushAll : { markers : req.body}},
	{upsert: true},
	function(err, user){
		if(err){
			console.log('error occured');
		} else {
			console.log(user.markers);
			res.status(204);
		}
	});
});

router.post('/register', (req, res) => {
	let newUser =  new User({
		name: req.body.name,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password
	});
	newUser.save((err) => {
		if(err){
			res.json({success: false, msg: "Failed to register user"});
		} else {
			res.json({success: true, msg: "User register"});
		}
	});
});

router.post('/authenticate' , function(req, res){
	User.findOne({ email : req.body.email }, function(err, user){
		if (err) throw err;
		if (!user) {
			res.send({success: false, msg: 'Authentication failed. User not found.'});
		} else if (!err) {
			console.log(user);
			bcrypt.compare(req.body.password, user.password, function(err, isMatch){
				if (err) throw err;
				if (isMatch){
					var token = jwt.encode(user, config.secret);
					res.json({success: true, msg: 'Authenticated!', token: 'JWT ' + token, user : user});	
				}	
			});		
		} else {
			res.send({success: false, msg: "Authentication failed. Wrong password."});
		}
	});
});


module.exports = router;

