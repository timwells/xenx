# xenx

### Vue
* npm run serve
* npm run build
 
### Firebase Reminder
* firebase init
   - Are you read to proceed? Y
   -   Functions,  Firebase Hosting
   - Use an existing project
   - Javascript
   - Use ESLint? N
   - install dependencies? Y
   - What public directory? dist
   - Configure as spa (rewrite...) N
   - Set up auto builds + deploys N
   - index.html exist OverWr ? N
* firebase deploy --only functions
* firebase deploy --only hosting



## rt database
{
  "rules": {
    ".read": "now < 1664751600000",  // 2022-10-3
    ".write": "now < 1664751600000",  // 2022-10-3
  }
}