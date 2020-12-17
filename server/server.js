 require ('./config/config.js');
const express = require ('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 

app.use(require('./routes/usuario'));
app.use(require('./routes/empleado'));
app.use(require('./routes/departamento'));

app.get('/', function (req, res) {
    res.send('Hola mundo');
  });
  app.get('/usuario', function (req, res){
    res.json({
        ok: 200, 
        mensaje:'Usuario consultado'
    })
})
 
   app.delete ('/usuario/:id', function (req, res){ 
let id = req.params.id

res.json({
    ok: 200,
    mensaje: 'Usuario eliminado bien',
    id: id
})
})

app.post('/usuario', function (req, res){
    let nombre = req.body.nombre;
    let body = req.body;
    res.json({
        ok: 200, 
        mensaje:'Usuario insertado bien',
       body:body 
    })
})
app.put('/usuario', function (req, res){
    let id = req.params.id
    let nombre = req.params.nombre;
    res.json({
        ok: 200,
        mensaje: 'Usuario actualizado con exito',
        id: id,
        nombre: nombre
    })
})


// Conexión a la base de datos Mongoose:
mongoose.connect('mongodb://localhost:27017/intercuatri', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}, (err, res) => {
 if (err) throw err;
 console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, () => {
  console.log('El servidor esta en linea por el puerto', process.env.PORT);
});
