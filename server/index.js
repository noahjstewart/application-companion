const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const util = require('util');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// connect to db
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
  .catch(e => console.log());
mongoose.set('useFindAndModify', false);
var db = mongoose.connection;
db.on("connected", function() {
  console.log("\nConnected to the db\n");
});
db.on("error", function() {
  console.log("Failed to connect to the db");
});
db.on("disconnected", function() {
  console.log("Disconnected from the db");
});

// MIDDLEWARE
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(`\nHandling ${req.method} ${req.url}`);
  console.log(`body: ${util.inspect(req.body, false, null)}\n`);
  next();
});

// ROUTES
const apiRoutes = require('./routes/api/routes');

app.use('/api', apiRoutes);


// run the server
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});