// POST https://accounts.spotify.com/api/token

// The body of this POST request must contain the following parameters encoded in application / x - www - form - urlencoded as defined in the OAuth 2.0 specification
// const client_credentials = 'x'
//might just be body, might be body:params
//Base 64 encoded string that contains the client ID and client secret key. The field must have the format: Authorization: Basic <base64 encoded client_id:client_secret>
// let body = { grant_type: client_credentials}
// let header = { 
//   Authorization: btoa("2d6b8ee81c784fa58be76068c3a0fad8: 954a2450ce4f4c82a4966d3828c87f90")
// }
//   "Basic < base64 encoded client_id: client_secret >"

// Client ID 2d6b8ee81c784fa58be76068c3a0fad8
// Client Secret 954a2450ce4f4c82a4966d3828c87f90
let token = '';
const client_id = '2d6b8ee81c784fa58be76068c3a0fad8'; // Your client id
const client_secret = '954a2450ce4f4c82a4966d3828c87f90'; // Your secret
let axios = require('axios');
//example app
var request = require('request'); // "Request" library

// var client_id = 'CLIENT_ID'; // Your client id
// var client_secret = 'CLIENT_SECRET'; // Your secret

// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, function (error, response, body) {
  if (!error && response.statusCode === 200) {

    // use the access token to access the Spotify Web API
    token = body.access_token;
    var options = {
      url: 'https://api.spotify.com/v1/users/jmperezperez',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };
    request.get(options, function (error, response, body) {
      console.log(body);
    });
  }
});

const options = {
  headers: {
    'Authorization': 'Bearer ' + token
  },
  
};
setTimeout(()=>{
  axios({
    url: 'https://api.spotify.com/v1/users/jmperezperez',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  
  })
  .then(x=>console.log(x))
  .catch(x => console.log(x));

}, 10000)
