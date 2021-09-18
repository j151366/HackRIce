const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
var conf = require('./conf');

const app = express();
app.use(bodyParser.json());

admin.initializeApp({
  credential: admin.credential.cert(conf.serviceAccount)
});
  
const db = admin.firestore();

require('./routes/userRoutes')(app, db);
require('./routes/eventRoutes')(app, db);
require('./routes/imageRoutes')(app, db);

app.get('/', function(req, res) {
    res.send('hello world');
});

// app.get('/get', async function(req, res) {
//   const usersRef = await db.collection('user').where('net_id', '==', "hl107").get();
//   console.log(usersRef.doc);
//   res.send("hello");
// });


const PORT = process.env.PORT || 8080;
app.listen(PORT);
