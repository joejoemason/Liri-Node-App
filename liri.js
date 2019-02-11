
// const inquirer = require('inquirer');
const axios = require('axios');
const command = process.argv[2];
const value = process.argv[3];


//node liri.js concert-this <artists/band name here

//https://rest.bandsintown.com/artists/ /events?app_id=codingbootcamp

function getMyBands(artist) {

  const url = 'https://rest.bandsintown.com/artists/' + artist + '/events?';
  //Optionally the request above could also be done as
  axios.get(url, {
    params: {
      app_id: 'codingbootcamp'
    }
  })
    .then(function (response) {
      console.log(JSON.stringify(response));
    })
    .catch(function (error) {
      console.log(JSON.stringify(error));
    });

}

if (command === 'concert-this') {
  getMyBands(value);
}

