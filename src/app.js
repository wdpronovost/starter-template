const express = require('express');



const app = express();
const router = express.Router();


app.use(express.static('dist'));

app.get('/', function(req, res) {
  res.sendFile('index.html');
});

app.listen(3000);