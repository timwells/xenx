const functions = require("firebase-functions");
const express = require('express');
const cors = require('cors');
const app = express();
const { config } = require("./config");

const VERSION = "0.0.1";
const API_KEY_NAME = "x-api-key"

const unauthorized = (res) => res.status(401).send('unauthorized');
const isApiKeyValid = (request,keyName,apiKeys) => {
   const apiKey = request.header(keyName);
   return (apiKey != undefined && 
               apiKey != null && apiKey.length > 0) ? 
                  apiKeys.includes(apiKey) : false;
}

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.get('/version', (request, response) => { response.send(VERSION); })

app.post('/event', (request, response) => {
   let eventTypeExists =  request.body.hasOwnProperty('eventType')
   response.status(200).json({eventType: eventTypeExists})
})

app.post('/v1/event', (request, response) => {
   if(isApiKeyValid(request,API_KEY_NAME,config.apiKeys)) {

      let eventTypeExists =  request.body.hasOwnProperty('eventType')
      response.status(200).json({eventType: eventTypeExists})
   
   } else unauthorized(response)
})

// Expose Express API as a single Cloud Function:
exports.xenx = functions.https.onRequest(app);
