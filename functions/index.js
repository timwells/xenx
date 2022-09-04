const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { getDatabase } = require('firebase-admin/database');

const express = require('express');
const cors = require('cors');
const app = express();
const { config } = require("./config");

const VERSION = "0.0.1";
const API_KEY_NAME = "x-api-key"
admin.initializeApp(functions.config().firebase);

const unauthorized = (res) => res.status(401).send('unauthorized');

const epochId = () => {
   let d = new Date();
   let cD = ("0" + d.getUTCDate()).slice(-2);
   let cM = ("0" + (d.getUTCMonth() + 1)).slice(-2);
   let cY = d.getFullYear();
   let cH = d.getUTCHours();
   return `${cY}${cM}${cD}/${cH}`       
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

app.post('/v1/event', (request, response) => {
   if(isApiKeyValid(request,API_KEY_NAME,config.apiKeys)) {
      const epochKey = `events/${epochId()}`
      const db = getDatabase();
      db.ref(`${epochKey}/counts`).once("value", 
         async (snapshot) => {
            let newCounts = 1;
            if (snapshot.exists()) newCounts = snapshot.val() + 1;            
            await db.ref(`${epochKey}`).set({ counts: newCounts })
            return response.status(200).json({ counts: newCounts })
         })
   } else return unauthorized(response)
})

// Expose Express API as a single Cloud Function:
exports.xenx = functions.https.onRequest(app);


// let eventTypeExists =  request.body.hasOwnProperty('eventType')
