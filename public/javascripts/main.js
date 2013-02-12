$(function(){

	audiojs.events.ready(function() {
	var a = audiojs.createAll({
	  
	});


	// Load from database
	var audio = a[0];
	songname = $('#do-stuff').attr('class')
	songurl = songname + '.mp3';
	$('.song' + songname).addClass('playing');
	audio.load(songurl);
	audio.play();

	// Load in a track on click
	$('ol li').click(function(e) {
	  e.preventDefault();
	  $(this).addClass('playing').siblings().removeClass('playing');
	  audio.load($('a', this).attr('data-src'));
	  audio.play();
	});

});



	$(".backgroundimage").on('click', function(){
			var id = $(this).attr('id');
			$('body').removeClass("background1");
			$('body').removeClass("background2");
			$('body').removeClass("background3");
			$('body').addClass(id); 
			$.post('/config/background', {image: id}, function(){});
	});

	$(".musicbutton").on('click', function(){
			var id = $(this).attr('id');
			//console.log(id);
			$.post('/config/music', {music: id}, function(){});
			$('.musicbutton').html('Use this');
			$(this).html('This is set');
	});


});