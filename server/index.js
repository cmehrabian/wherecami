const express = require('express');
const bodyParser = require('body-parser');
const database = require('../database');
const { save } = require('../database/index.js');

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.static(__dirname + '/../client/dist'));

app.get('/location', function (req, res) {
});

app.post('/location', function (req, res) {
  let location = req.body;
  database.save(location);
});

let port = 3000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
