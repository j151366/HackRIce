const http = require('http');
const express = require('express');
const admin = require('firebase-admin');
var conf = require('./conf');


var app = express();


admin.initializeApp({
  credential: admin.credential.cert(conf.serviceAccount)
});
  
const db = admin.firestore();

app.get("/api/test", async (req, res) => {
    const snapshot = await db.collection('test').get();
    snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
    });
    res.status(200).send();
    
});

app.get('/', function(req, res) {
  res.send('hello world');
});

app.listen(conf.port, conf.hostname, () => {
  console.log(`Server running at http://${conf.host}:${conf.port}/`);
});