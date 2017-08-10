const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/../client/dist'));

app.post('/item', function (req, res) {
});

app.get('/item', function (req, res) {
});



app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
