require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require('node-spotify-api');

var command1 = process.argv[2];
if (command1 === "spotify-this-song") {
    
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: 'I Want it That Way' }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(JSON.stringify(data, null, 2));
    });
}

// function displayMovieInfo() {
//     var movie = $(this).attr("data-name");
//     var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";