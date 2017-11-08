const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
	name : {
	type : String,
	required : true
	},
	email : {
		type : String,
		unique : true,
		required : true
	},
	username : {
		type : String,
		// unique : true,
		required : true
	},
	password : {
		type : String,
		required : true
	},
	test : {
		type : String
	},
	markers : []
	}, { collection: "users" }
);

UserSchema.pre('save', function(next){
	var user = this;
	bcrypt.genSalt(9, function(err, salt){
		if (err) {
			return next(err);
		}
		bcrypt.hash(user.password, salt, function (err, hash){
			if (err) {
				return next(err);
			}
			user.password = hash;
			next();
		});
	}); 
});

module.exports = mongoose.model('User', UserSchema);

