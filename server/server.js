const express = require('express')
const app = express();
 
app.get('/', function (req, res) {
  res.send('<h1>Bienvenido a mi servidor Rest</h1>');
});

app.get('/usuario', function (req, res) {
  res.json({
    ok: 200,
    mensaje: 'Usuario consultados con exito'
  })
});
 

app.post('/usuario', function (req, res){
  res.json({
    ok: 200,
    mensaje: 'usuario insertado con exito'
  })
});
 
 
app.listen(3000, () => {
    console.log('El servidor esta en linea por el puerto 3000')
});