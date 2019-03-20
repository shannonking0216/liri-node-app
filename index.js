require("dotenv").config();
const fs = require("fs");
const axios = require("axios");
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);

// Takes in all of the command line arguments
const inputString = process.argv;
const action = process.argv[2];
let value = process.argv[3];
// store the results from each command here
let results;

// --------------------------------------------

function spotifyMySong() {
    const songTitle = process.argv[3];
    spotify.search({ type: 'track', query: songTitle }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        // console.log(JSON.stringify(data, null, 2));

        for (let i = 0; i < data.tracks.items.length; i++) {
            // artistData is printed in the terminal
            const artistData = data.tracks.items[i];
            // console.log(artistData.album);
            // the locations should come from the objects in the JSON data
            console.log("Artist(s): " + artistData.artists[0].name + "\nSong Name: " + artistData.name + "\nSpotify Preview Link: " + artistData.preview_url + "\nAlbum Name: " + artistData.album.name);
        }
    });
}


function concert() {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
    console.log(JSON.stringify(data, null, 2));
}

function movie() {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
    console.log(JSON.stringify(data, null, 2));
    const movieTitle = process.argv[3];
    axios.get("http://www.omdbapi.com/?i=tt3896198" + movieTitle + "&y=&plot=short&apikey=" + keys.omdbKey.secret)
        .then(function (response) {
            console.log(response.data);
        });
}

function doIt() {
    fs.readFile("random.txt", "utf8", process.argv[3], function (err) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(JSON.stringify(data, null, 2));
    });
}


switch (action) {
    case "spotify-this-song":
        spotifyMySong();
        break;

    case "concert-this":
        concert();
        break;

    case "movie-this":
        movie();
        break;

    case "do-what-it-says":
        doIt();
        break;
    default:
        console.log("Please use either spotify-this-song, concert-this, movie-this, or do-what-it-says");
}


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
*/