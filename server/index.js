const express = require('express');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.get('/location', function (req, res) {
});

app.post('/location', function (req, res) {
});

let port = 3000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
