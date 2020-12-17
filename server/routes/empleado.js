const express = require('express');
const _ = require('underscore');
// const usuario = require('../models/usuario');
const Empleado = require('../models/empleado');
const app = express();
 
    app.get('/empleado', function (req, res) {
    // Ordenar:
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 5;
    
    Empleado.find({ estado:true })
        .skip(Number(desde))
        .limit(Number(hasta)) 
        .populate('usuario', 'nombre mail')
        .exec((err, empleados) => {
    if (err) {
        return res.status(400).json({
        ok:false,
        msg:'Ocurrio un error de consultar.',
        err
            });
            }
    // Respuesta exitosa:
    res.json({
    ok:true,
    msg:'Lista de empleados obtenida con éxito.',
    conteo:empleados.length,
    empleados
            });
        });
    });
 
    app.post('/empleado', function(req, res){
        let body = req.body;
        let usr = new Empleado({
        nombredepuesto: body.nombredepuesto,
        anosdeservicio: body.anosdeservicio,
        hora_entrada: body.hora_entrada,
        hora_salida:body.hora_salida,
        
    });
        
    usr.save((err, usrDB) => {
    // Si hubo algún error:
    if (err){
    return res.status(400).json({
        ok:false,
        msg:'Ocurrio un error.',
        err
        });
    }
    res.json({
    ok:true,
    msg:'Empleado insertado con exito.',
    usrDB
            });
        });
 
        });
 
        app.put('/empleado/:id', function(req, res) {
          let id = req.params.id;
          let body = _.pick(req.body, ['nombredepuesto','anosdeservicio', 'hora_entrada', 'hora_salida']);
      
          Empleado.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' },
              (err, usrDB) => {
                  if (err) {
                      return res.status(400).json({
                          ok: false,
                          msg: 'Ocurrio un error al momento de actualizar',
                          err
                      });
                  }
      
                  res.json({
                      ok: true,
                      msg: 'Usuario actualizado con exito',
                      usuario: usrDB
                  });
              });
      });

      app.delete('/empleado/:id', function(req, res){
        let id = req.params.id;
    
        Usuario.findByIdAndUpdate(id, {estado: false }, {new: true, runValidators: true, context: 'query'},
        (err, usrDB) =>{
          if (err){
                  return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrió un error al momento de eliminar.',
                    err
                  });
                }
                res.json({
                  ok: true,
                  msg: 'empleado eliminado exitosamente.',
                  usrDB 
                });
        });
      });
 
    module.exports = app;