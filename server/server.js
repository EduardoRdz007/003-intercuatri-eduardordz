
require ('./config/config.js');
const express = require('express');
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


app.get('/', function (req, res) {
    res.send('<h1>Bienvenido al inter.</h1>');
  });

  app.listen(process.env.PORT, () => {
    console.log('El servidor está en línea en el puerto: ', process.env.PORT);
    });