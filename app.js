const http = require('http');
const express = require('express');
const admin = require('firebase-admin');
var conf = require('./conf');


var app = express();


admin.initializeApp({
  credential: admin.credential.cert(conf.serviceAccount)
});
  
const db = admin.firestore();

app.get("/get/event", async (req, res) => {
    const snapshot = await db.collection('event').get();
    snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
    });
    res.status(200).send();
    
});


app.post("/add/user", function (req, res) {
    var data = {
      name: req.body.name,
      net_id: req.body.net_id,
      password: req.body.password
    };
    const res = await db.collection('user').doc().set(data);
  });


app.get('/', function(req, res) {
    res.send('hello world');
});


app.listen(conf.port, conf.host, () => {
  console.log(`Server running at http://${conf.host}:${conf.port}/`);
});
