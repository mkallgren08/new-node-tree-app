const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const Pusher = require('pusher')
require('dotenv').config();

/* SET UP BASIC APP ==================*/
const PORT = process.env.PORT || 3001;
const app = express();

// Configre app headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
app.use(express.static("client/build"));
// Add routes, both API and view
app.use(routes);

/* PUSHER DECLARATIONS ==================*/
// Set up Pusher information
var pusher = new Pusher({
  appId: '713669',
  key: '651f8f2fd68d8e9f1ab0',
  secret: 'bb6c55ebcb5b177bb6bd',
  cluster: 'mt1',
  encrypted: true
});
// Test the Pusher connection
pusher.trigger('my-channel','my-event',{"message":"Hi from the new app"})


/* MONGODB AND MONGOOSE SETUP ==================*/
// Set up promises with mongoose
mongoose.Promise = global.Promise;

// Declare Mongoose Connection Parameters
let mongoConnect = process.env.MONGODB_URI2;

// Connect to the Mongo DB
mongoose.connect(
  mongoConnect, {
    useMongoClient: true
  }
);

const db = mongoose.connection;

// Show any mongoose errors
db.on("error", function (error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function () {
  console.log(`Mongoose connection to ${mongoConnect} successful.`);
  const nodeCollection = db.collection('nodes');

  // **************ERROR***************************
  // This line causes a 503 error 
  // VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV

  const changeStream = nodeCollection.watch(); /* <==============THIS IS THROWING THE ERROR */

  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^



});


/* FINAL SETUP STEPS */
// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
