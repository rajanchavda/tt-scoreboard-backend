const express = require('express');
const http = require('http')
require('./db/db');
var cors = require('cors')

const app = express();
const server = http.createServer(app);

// Socket.io config
const { Server } = require("socket.io");
const io = new Server(server);

// Setting up socket.io events
const { OnConnectionSuccess } = require('./socket.io/socketio')
OnConnectionSuccess(io)

// Import Routing
const userRouter = require('./routers/user')
const gameRouter = require('./routers/game')


// app.use(cors())
app.use(express.json())

// Add headers before the routes are defined
app.use(cors({ origin: '*' }));
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  res.setHeader('Referrer-Policy', 'no-referrer');

  // Pass to next layer of middleware
  next();
});


// Embed socket.io in req object
app.use((req, res, next) => {
  req.io = io;
  return next();
});


// Router
app.use(userRouter)
app.use(gameRouter)


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log('Server started on port ', PORT);
})