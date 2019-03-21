require("dotenv").config();
const fs = require("fs");
const axios = require("axios");
const keys = require("./keys");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);

// Takes in all of the command line arguments
const action = process.argv[2];
let value = "";
for (var i = 3; i < process.argv.length; i++) {
    value += process.argv[i] + "+";
}
value = value.slice(0, -1);
// first iteration - i+
// second iteration - i+want+

function spotifyMySong(songTitle) {
    // If no song is provided, then your program will default to "The Sign" by Ace of Base
    let searchTerm;
    if (!songTitle) {
        searchTerm = "Ace of Bass";
    } else {
        searchTerm = songTitle;
    }

    spotify.search({ type: 'track', query: searchTerm }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        for (let i = 0; i < data.tracks.items.length; i++) {
            // artistData is printed in the terminal
            const artistData = data.tracks.items[i];
            // console.log(artistData.album);
            // the locations should come from the objects in the JSON data
            console.log("\n\nArtist(s): " + artistData.artists[0].name + "\nSong Name: " + artistData.name + "\nSpotify Preview Link: " + artistData.preview_url + "\nAlbum Name: " + artistData.album.name);
        }
    });
}

function concert(artist) {
    var requestUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(requestUrl)
        .then(function (response) {
            console.log(response);
            for (let i = 0; i < response.length; i++) {
                const response = response[i];
                /*  for (let i = 0; i < data.concert.items.length; i++) {
              const concertData = data.concert.items[i];   
              conole.log("\n\nName of the venue: " + concertData.venue +... Venue location
              Date of the Event (use moment to format this as "MM/DD/YYYY"))
              */
            }
        })
        .catch(function (err) {
            console.log('Error occurred: ' + err);
        });

    function movie(movieName) {
        let searchTerm;
        if (!movieName) {
            searchTerm = "Mr. Nobody";
        } else {
            searchTerm = movieName;
        }
        var requestUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=" + keys.omdbKey.secret;
        console.log(requestUrl);

        axios.get(requestUrl)
            .then(function (response) {
                console.log(response.data);
             /*  for (let i = 0; i < data.movie.items.length; i++) {
            const movieData = data.movie.items[i];   
            conole.log("\n\nName of the movie: " + movieData.venue + ....                                              
            * Title of the movie.
            * Year the movie came out.
            * IMDB Rating of the movie.
            * Rotten Tomatoes Rating of the movie.
            * Country where the movie was produced.
            * Language of the movie.
            * Plot of the movie.
            * Actors in the movie. ))
            */
            })
            .catch(function (err) {
                console.log('Error occurred: ' + err);
            });
    }

    function doWhatItSays() {
        fs.readFile("random.txt", "utf8", function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            var dataArray = data.split(",");

            var randomAction = dataArray[0];
            var randomValue = dataArray[1];
            if (randomAction === "do-what-it-says") {
                console.log("Please use either spotify-this-song, concert-this, movie-this");
                return;
            }

            functionCall(randomAction, randomValue);
        });
    }

    const functionCall = function (theAction, theValue) {
        // theAction: movie-this
        // theValue: the+matrix
        switch (theAction) {
            case "spotify-this-song":
                spotifyMySong(theValue);
                break;

            case "concert-this":
                concert(theValue);
                break;

            case "movie-this":
                movie(theValue);
                break;

            case "do-what-it-says":
                doWhatItSays();
                break;
            default:
                console.log("Please use either spotify-this-song, concert-this, movie-this, or do-what-it-says");
        }
    }

    functionCall(action, value);

/*
Liri will understand four commands:

1. concert-this:
    a. When the command concert-this is followed by an artist/band name, in the form of a string,
    this will search the Bands in Town Artist Events API
    ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
    for an artist and render the following information about each event to the terminal:
        Name of the venue
        Venue location
        Date of the Event (use moment to format this as "MM/DD/YYYY")

2. spotify-this-song:
     a. When the command spotify-this-song is followed by a song name, in the form of a string,
//     the following information about that song will be displayed in the terminal/bash window:
//         Artist(s)
//         The song's name
//         A preview link of the song from Spotify
//         The album that the song is from
//     b. If no song is provided, then your program will default to "The Sign" by Ace of Base.
//     c. Utilize the node-spotify-api package in order to retrieve song information from the Spotify API

3. movie-this:
    a. When the command movie-this is followed by a movie name, in the form of a string,
    the following information about that movie will be displayed in the terminal/bash window:
        * Title of the movie.
        * Year the movie came out.
        * IMDB Rating of the movie.
        * Rotten Tomatoes Rating of the movie.
        * Country where the movie was produced.
        * Language of the movie.
        * Plot of the movie.
        * Actors in the movie.
    b. If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
         http://www.imdb.com/title/tt0485947/
    c. You'll use the axios package to retrieve data from the OMDB API. Like all of the
         in-class activities, the OMDB API requires an API key. You may use trilogy.

4. do-what-it-says:
    a. Use fs Node package, ReadFile.
    b. LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
            It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
            Edit the text in random.txt to test out the feature for movie-this and concert-this.

Take screenshots, and make a readme for your app.
            */