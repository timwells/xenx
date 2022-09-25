const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { getDatabase } = require('firebase-admin/database');

const express = require('express');
const cors = require('cors');
const app = express();
const { config } = require("./config");

const VERSION = "0.0.9";
const API_KEY_NAME = "x-api-key"
admin.initializeApp(functions.config().firebase);

const unauthorized = (res) => res.status(401).send('unauthorized');

const epochId = () => {
   let d = new Date();
   let cD = ("0" + d.getUTCDate()).slice(-2);
   let cM = ("0" + (d.getUTCMonth() + 1)).slice(-2);
   let cY = d.getFullYear();
   let cH = ("0" + d.getUTCHours()).slice(-2);

   return `${cY}${cM}${cD}/${cH}`       
}

const epochId2 = () => {
   let d = new Date();
   let cD = ("0" + d.getUTCDate()).slice(-2);
   let cM = ("0" + (d.getUTCMonth() + 1)).slice(-2);
   let cY = d.getFullYear();
   let cH = ("0" + d.getUTCHours()).slice(-2);

   return {
      date: `${cY}${cM}${cD}`,
      hr: `${cH}`
   }       
}

const isApiKeyValid = (request,keyName,apiKeys) => {
   const apiKey = request.header(keyName);
   return (apiKey != undefined && 
               apiKey != null && apiKey.length > 0) ? 
                  apiKeys.includes(apiKey) : false;
}

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));
app.get('/version', (request, response) => { response.send(VERSION); })

/*
 events2\20220924\total = 203
 events2\20220924\01\count = 13 
*/

app.post('/v1/event', (request, response) => {
   if(isApiKeyValid(request,API_KEY_NAME,config.apiKeys)) {
      const epoch = epochId2();
      const db = getDatabase();      
      const updates = {};
      updates[`events/${epoch.date}/${epoch.hr}/counts`] = admin.database.ServerValue.increment(1);
      updates[`events/${epoch.date}/total`] = admin.database.ServerValue.increment(1);
      db.ref().update(updates);

      return response.status(200).json('ok');

   } else return unauthorized(response)
})

// Expose Express API as a single Cloud Function:
exports.xenx = functions.https.onRequest(app);
