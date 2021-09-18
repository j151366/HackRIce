const http = require('http');
const admin = require('firebase-admin');
var serviceAccount = require("./hackrice-326323-firebase-adminsdk-na80w-0e642ca557.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
  

const db = admin.firestore();





const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});