const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const pusher = require('./utils/Pusher')
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
// Set Pusher channels
const channel = 'nodes';

/* MONGODB AND MONGOOSE SETUP ==================*/
// Set up promises with mongoose
mongoose.Promise = global.Promise;

// Declare Mongoose Connection Parameters
let mongoConnect = process.env.MONGODB_URI;

// Connect to the Mongo DB
mongoose.connect(
  mongoConnect
  // , {
  //   useMongoClient: true
  // }
);

const db = mongoose.connection;

// Show any mongoose errors
db.on("error", function (error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function () {
  console.log(`Mongoose connection to MONGODB_URI successful.`);

  // Currently code below this line is not needed for any functionality, 
  // but it provides a good example of how the change stream functions 
  // work - which, depending on future features could prove useful!
  const nodeCollection = db.collection('nodes');
  // **************ERROR (Currently Solved) *******************
  // This line was causing a 503 error on Heroku Deployment - 
  // had to upgrade Mongod DB to version>= 3.1.13 and Mongoose to 
  // version >= 5.4.12 to solve, leaving this note in in case it 
  // crops up again.
  // VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
  const changeStream = nodeCollection.watch();
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  changeStream.on('change', (change) => {
    // console.log(change);
    if (change.operationType === 'insert') {
      const child = change.fullDocument;
      //console.log("Child Data: ")
      //console.log(child)
      pusher.trigger(
        channel,
        'inserted',
        child
      );
    } else if (change.operationType === 'delete') {
      const data = change.documentKey
      console.log(`Deleted Child Data: ${data._id}`)
      //console.log(data)
      pusher.trigger(
        channel,
        'deleted',
        data
      );
    }
  })
});


/* FINAL SETUP STEPS */
// Send every request to the React app
// Define any API routes before this runs
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function () {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
