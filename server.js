// server.js
// where your node app starts

// init project
require('dotenv').config({path: __dirname + '/.env'});
const express = require('express');
const app = express();
const morgan = require("morgan");

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use(morgan('dev'));
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// returning current date and time if empty... 
app.get("/api/", function (req, res) {
  res.json({'unix': Date.now(), 'utc': Date()});
});

// returning current date and time accepting either unix or valid date, or error otherwise... 
app.get("/api/", function (req, res) {
  res.json({'unix': Date.now(), 'utc': Date()});
});

//returning current date and time when date param is passed
app.get("/api/:date", (req, res) => {
  let dateString = req.params.date;

  if (!isNaN(Date.parse(dateString))) {
    let dateObject = new Date(dateString);
    res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
  } else if (/\d{5,}/.test(dateString)) {
      let dateInt = parseInt(dateString);
      res.json({ unix: dateInt, utc: new Date(dateInt).toUTCString() });
  } else {
    res.json({ error: "Invalid Date" });
  }

});

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
