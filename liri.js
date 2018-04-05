//This is putting the .env file into process.env... 
require("dotenv").config();

var key = require("./key.js");
var fs = require('fs');
var type = process.argv[2];

var Twitter = require('twitter');
var client = new Twitter(key.twitter);
var params = { screen_name: 'test_toeyheen', count: 20 };

if (type === 'my-tweets') {
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      for (var i = 0; i <= tweets.length; i++) {
        // console.log(JSON.stringify(tweets, null, 2));
        console.log(tweets[i].created_at + '\n' +

          'Tweet content: ' + tweets[i].text + '\n' +

          '------------------------\n');
      }
    };
  })
}

//var spotify = new Spotify(keys.spotify);
var Spotify = require('node-spotify-api');
var song = process.argv[3];
var title = " ";
var spotify = new Spotify(key.spotify);

if (type === 'spotify-this-song' && song === undefined) {
  title = 'The Sign by Ace of Base'
  spotify.search({ type: 'track', query: title }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    //console.log(data);
    console.log(("Song's name: " + JSON.stringify(data.tracks.items[0].name, null, 2)));
    console.log(("Artiste name: " + JSON.stringify(data.tracks.items[0].artists[0].name, null, 2)));
    console.log(("Album name: " + JSON.stringify(data.tracks.items[0].album.name, null, 2)));
    console.log(("Preview URL: " + JSON.stringify(data.tracks.items[0].preview_url, null, 2)));
  });
}

else if (type === 'spotify-this-song') {
  for (var i = 3; i < song.length; i++) {
    // Build a string with the address.
    title = title + " " + song[i];
    console.log(title);

  }
  spotify.search({ type: 'track', query: title }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log(("Song's name: " + JSON.stringify(data.tracks.items[0].name, null, 2)));
    console.log(("Artiste name: " + JSON.stringify(data.tracks.items[0].artists[0].name, null, 2)));
    console.log(("Album name: " + JSON.stringify(data.tracks.items[0].album.name, null, 2)));
    console.log(("Preview URL: " + JSON.stringify(data.tracks.items[0].preview_url, null, 2)));

  });
}



// Include the request npm package (Don't forget to run "npm install request" in this folder first!)
// ...
var request = require("request");
// Grab or assemble the movie name and store it in a variable called "movieName"
var movie = process.argv[3];
var movieName = "";
// ...
// Then run a request to the OMDB API with the movie specified

if (type === 'movie-this' && movie === undefined) {
  movieName = 'Mr. Nobody'
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  request(queryUrl, function (error, response, body) {
    console.log(movieName);
    if (!error && response.statusCode === 200) {
      console.log("imdbRating: " + JSON.parse(body).imdbRating);

      // Then log the Release Year for the movie
      // ...
      console.log("Year: " + JSON.parse(body).Year);
      console.log("Country: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
    }
  });
}

else if (type === 'movie-this') {
  for (var i = 3; i < movie.length; i++) {

    // Build a string with the address.
    movieName = movieName + " " + movie[i];
    // console.log(movieName);
  }
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  request(queryUrl, function (error, response, body) {

    // This line is just to help us debug against the actual URL.

    console.log(queryUrl);

    // Then create a request to the queryUrl
    // ...
    // If the request is successful. This is the call back function
    // ...

    if (!error && response.statusCode === 200) {
      console.log("imdbRating: " + JSON.parse(body).imdbRating);

      // Then log the Release Year for the movie
      // ...
      console.log("Year: " + JSON.parse(body).Year);
      console.log("Country: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
    }
  });
}

function do_what_it_says(){

  fs.readFile('random.txt', "utf8", function(error, data){
    console.log("test");
    var txt = data.split(',');



    // spotify-this-song(txt[1]);

    spotify.search({ type: 'track', query: txt[1] }, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      console.log(("Song's name: " + JSON.stringify(data.tracks.items[0].name, null, 2)));
      console.log(("Artiste name: " + JSON.stringify(data.tracks.items[0].artists[0].name, null, 2)));
      console.log(("Album name: " + JSON.stringify(data.tracks.items[0].album.name, null, 2)));
      console.log(("Preview URL: " + JSON.stringify(data.tracks.items[0].preview_url, null, 2)));
  
    });

  });

}
do_what_it_says();