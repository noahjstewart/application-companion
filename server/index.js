const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const util = require('util');
const mongoose = require('mongoose');

const app = express();

// connect to db
mongoose.connect('mongodb://localhost:27017/applicationtracker', { useNewUrlParser: true })
  .catch(e => console.log(e));
var db = mongoose.connection;
db.on("error", console.error.bind(console, "\nFailed to connect to the db\n"));
db.once("open", function (callback) {
  console.log("\nConnected to the db\n");
});

// MIDDLEWARE
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  let reqUrl = req.protocol + '://' + req.get('Host') + req.url;
  console.log(`\nHandling ${req.method} ${reqUrl} -- params: ${util.inspect(req.body, false, null)}\n`);
  next();
});

// ROUTES
const applications = require('./routes/api/applications');

app.use('/api/applications', applications);


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});