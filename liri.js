require("dotenv").config();
// const inquirer = require('inquirer');
const axios = require('axios');
const moment = require('moment');
const Spotify = require('node-spotify-api');

const command = process.argv[2];
const value = process.argv[3];

//`node liri.js spotify-this-song '<song name here>'`


const spotify = new Spotify({
  id: '38c0d94e0b9346f18a5b5fd1355caacf',
  secret: 'ed3a7d9249544702968981e10e4c0ba8'
}); //create an instance

function getMeSpotify(item) {
  spotify.search({ type: 'track', query: 'All the Small Things', limit: 10 }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    console.log(JSON.stringify(data[0]));
  });
}


//node liri.js concert-this <artists /band name here

//https://rest.bandsintown.com/artists/ /events?app_id=codingbootcamp

var getMyBands = function (artist) {
  var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

  axios.get(queryURL).then(
    function (response) {
      var jsonData = response.data;

      if (!jsonData.length) {
        console.log("No results found for " + artist);
        return;
      }

      console.log("Upcoming concerts for " + artist + ":");

      for (var i = 0; i < jsonData.length; i++) {
        var show = jsonData[i];

        // Print data about each concert
        // If a concert doesn't have a region, display the country instead
        // Use moment to format the date
        console.log(
          show.venue.city +
          "," +
          (show.venue.region || show.venue.country) +
          " at " +
          show.venue.name +
          " " +
          moment(show.datetime).format("MM/DD/YYYY")
        );
      }
    }
  );
};



// Collapse

// Message Input


// Message TA - Chris Yang

// About this conversation



// function getMyBands(artist) {

//   const url = 'https://rest.bandsintown.com/artists/' + artist + '/events?';
//   //Optionally the request above could also be done as
//   axios.get(url, {
//     params: {
//       app_id: 'codingbootcamp'
//     }
//   })
//     .then(function (response) {
//       console.log(response.data[1]);
//     })
//     .catch(function (error) {
//       console.log(JSON.stringify(error.data));
//     });

// }

switch (command) {
  case 'concert-this':
    getMyBands(value);;
    break;

  case 'spotify-this-song':
    getMeSpotify(value);;
    break;

  default:
    console.log('Please enter one of the commands/n node liri.js concert-this song_value \n node liri.js spotify-this-song value')
}

