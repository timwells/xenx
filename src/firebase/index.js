import { initializeApp } from 'firebase/app'
import { getDatabase } from "firebase/database";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIRBEASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID
};

//initialize the firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth()
const database = getDatabase(app)

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
      const unsubscribe =  getAuth().onAuthStateChanged(user => {
          unsubscribe();
          resolve(user);
      }, reject);
  })
};


export {
  auth,
  getCurrentUser,
  database
};