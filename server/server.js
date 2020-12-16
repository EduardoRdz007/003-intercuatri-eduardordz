
require ('./config/config.js');
const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const app = express();

app.get('/', function (req, res) {
    res.send('<h1>Quiuboles al servidor REST.</h1>');
  });

  app.listen(process.env.PORT, () => {
    console.log('El servidor está en línea en el puerto: ', process.env.PORT);
    });