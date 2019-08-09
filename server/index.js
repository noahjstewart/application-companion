const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const util = require('util');

const app = express();

// MIDDLEWARE
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  let reqUrl = req.protocol + '://' + req.get('Host') + req.url;
  console.log(`\nHandling ${req.method} ${reqUrl} -- params: ${util.inspect(req.params, false, null)}\n`);
  next();
});

// ROUTES
const applications = require('./routes/api/applications');

app.use('/api/applications', applications);


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});