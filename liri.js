var keys = require('./keys.js');
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request'); 

var getMyTweets = function(){ 

	var client = new Twitter(keys.twitterKeys);
	 
	var params = {screen_name: 'DumpTrumpanzee'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    //console.log(tweets);
	    for (var i = 0; i < tweets.length; i++) {
	    	console.log(tweets[i].created_at);
	    	console.log(' ');
	    	console.log(tweets[i].text)
	    }
	  }
	});

}

var getArtistNames = function(artist) {
	return artist.name;
}

var getMeSpotify = function(songName) {

	spotify.search({ type: 'track', query: 'songName' }, function(err, data) {
		if (err) {
			console.log('Error occurred: ' + err);
			return;
		}
		
		var songs = data.tracks.items;
		for (var i = 0; i < songs.length; i++) {
			console.log(i)
			console.log('artist(s): ' + songs[i].artists.map(
				getArtistNames));
			console.log('song name: ' + songs[i].names);
			console.log('preview song: ' + songs[i].preview_url);
			console.log('album: ' + songs[i].album.name);
			console.log('==============================');
		}
	});
}

/*request('http://www.omdbapi.com/?t=fast+five&y=&plot=short&r=json', function(error, response, body) {
	if (!error && response.statusCode === 200) {
		console.log(body)
	}
})*/

/*var spotify = new Spotify({
  id: ' ',
  secret: ' '
});
 
spotify.search({ type: 'track', query: 'All the Small Things' })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err) {
    console.log(err);
});*/

var pick = function(caseData, functionData) {
	switch(caseData) {
		case 'my-tweets':
			getMyTweets();
			break;
		case 'spotify-this-song':
			getMeSpotify(functionData);
			break;	
		default:
		console.log("LIRI is confused")
	}
}

var runThis = function(argOne, argTwo) {
	pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);