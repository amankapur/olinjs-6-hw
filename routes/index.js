var models = require('./models');

exports.index = function(req, res, next){
  req.facebook.api('/me', function(err, data) {
  	if (err) return console.log('error', err);
  	console.log(data);
	  if (!req.session.user){
	  	models.User.findOne({username : data.username},function(err, user) {
				if (err) return console.log('error', err);
				if (user) {
					req.session.user = user;
					console.log(user.username);
					console.log('ALREADY A USER');
					res.redirect('/');
				}
				else {
					data.hometown = data.hometown.name;
					data.location = data.location.name;
					var nuconfig = new models.Config({ backgroundimg : 'none', music: 'none'});
					nuconfig.save(function(err){
						if(err) return console.log('error', err);
						data.config = nuconfig;	
						
				  	var newUser = new models.User(data);
				  	newUser.save(function(err){
							console.log('saving user');
							if(err) return console.log("error", err);
							req.session.user = newUser;

						});
				  });
			  }
			});
			next();
		}

		else {
			models.User.findOne({username : req.session.user.username}).populate('config').exec(function(err, doc){
				res.render('loggedIn', {title: doc.name, user: doc});
			});
		}
	});

};



exports.getPic = function(req, res){
	req.facebook.api('/me/picture?redirect=false&type=normal', function(err, data){

		//console.log(data.data.url);
		models.User.findOne({username : req.session.user.username}).populate('config').exec(function(err, doc){
			if(err) return console.log('error', err);
			doc.imglink = data.data.url;
			doc.save(function(err){
				if(err) return console.log('error', err);
			});
			// req.facebook.api('/me/albums', function(err, data){
			// 	console.log(data);
			// });
			res.render('loggedIn', {title: doc.name, user: doc});
		});

	});
};

exports.background = function(req, res){
	var image = req.body.image;
	models.User
	.findOne({username: req.session.user.username})
	.exec(function(err, doc){
		if(err) return console.log('error', err);
		console.log(doc);
		models.Config
		.findOne({_id: doc.config})
		.exec(function(err, data){
			if(err) return console.log('error', err);
			console.log(data);
			data.backgroundimg = image;
			data.save(function(err){
				if(err) return console.log('error', err);
			});
		 });
	});
};

exports.music = function(req, res){
	var music = req.body.music;
	models.User
	.findOne({username: req.session.user.username})
	.exec(function(err, doc){
		if(err) return console.log('error', err);
		console.log(doc);
		models.Config
		.findOne({_id: doc.config})
		.exec(function(err, data){
			if(err) return console.log('error', err);
			console.log(data);
			data.music = music;
			data.save(function(err){
				if(err) return console.log('error', err);
			});
		 });
	});
};

exports.albums = function(req, res){

	req.facebook.api('/me/albums', function(err, data){
		if(err) return console.log('error', err);
		//console.log(req.session.user);
		req.session.albums = data;
		res.render('albums', {title: 'ALBUMS', albums: data.data, user: req.session.user, albumid: "none", comments:"none"});
	});

};

exports.albumid = function(req, res){

	var id = req.params.albumid;
	//console.log(id);
	req.facebook.api('/' + id + '/photos', function(err, data){
		if(err) return console.log('error', err);
		//console.log(data.data);
		res.render('_albumpics', {albumid: data.data});
	});
};

exports.photoComment = function(req, res){
	var id = req.params.photoid;
	//console.log(id);
	req.facebook.api('/' + id + '/comments', function(err, data){
		if(err) return console.log('error', err);
		//console.log(data.data);
		res.render('_comments', {comments: data.data});
	});

};

exports.newcomment = function(req, res){
	var id = req.body.image;
	var comment = req.body.text;
	console.log("NEW POST###########");
	console.log(id);
	console.log(comment);

	req.facebook.api('/'+id+'/comments', 'POST', {'message': comment}, function(err, data){
		console.log(err);
		console.log(data);
		req.facebook.api('/' + id + '/comments', 'GET', function(err, data){
			if(err) return console.log('error', err);
				console.log("RELOAD ########################");
				console.log(data.data);
				res.render('_comments', {comments: data.data});
		});
	});
};