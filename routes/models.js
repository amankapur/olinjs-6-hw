var mongoose = require("mongoose");

mongoose.connect(process.env.MONGOLAB_URI || 'localhost');

var userSchema = mongoose.Schema({
	'name' : String,
	'first_name' : String,
	'last_name' : String,
	'link' : String,
	'username' : String,
	'hometown' : String,
	'location' : String, 
	'quotes' : String,
	'gender' : String,
	'email' : String,
	'imglink' : String,
	'config' : {type: mongoose.Schema.Types.ObjectId, ref: 'Config'}	
});

var configSchema = mongoose.Schema({
	'backgroundimg' : String, 
	'music': String
});

var newConfig = mongoose.model('Config', configSchema);
var newUser = mongoose.model('User', userSchema);


exports.User = newUser;
exports.Config = newConfig;