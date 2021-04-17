const http = require('http'); //no video do alemão esta como express, porém no do Masseranto esta como http (working) 
const app = require('./app');

const port = process.env.PORT || 1000;

const server = http.createServer(app);

server.listen(port);