const express = require('express');
const _ = require('underscore');
// const usuario = require('../models/usuario');
const Departamento = require('../models/departamento');
const app = express();
 
    app.get('/departamento', function (req, res) {
    // Ordenar:
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 5;
 
    Departamento.find({ estado:true })
        .skip(Number(desde))
        .limit(Number(hasta))
        .populate('empleado', 'nombredepuesto anosdeservicio')
        .exec((err, departamentos) => {
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
    msg:'Lista de departamentos obtenida con éxito.',
    conteo:departamentos.length,
    departamentos
            });
        });
    });
 
    app.post('/departamento', function(req, res){
        let body = req.body;
        let dpto = new Departamento({
            nombre: body.nombre,
            id_jefe_de_area: body.id_jefe_de_area,
            numero_deempleado: body.numero_deempleado,
            extension_tel: body.extension_tel
        
    });
        
    dpto.save((err, dptoDB) => {
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
    msg:'Departamento insertado con exito.',
    dptoDB
            });
        });
 
        });
 
        app.put('/departamento/:id', function(req, res) {
          let id = req.params.id;
          let body = _.pick(req.body, [,'id_jefe_de_area','nombre', 'numero_de_empleado', 'extension_tel']);
      
          Departamento.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' },
              (err, dptoDB) => {
                  if (err) {
                      return res.status(400).json({
                          ok: false,
                          msg: 'Ocurrio un error al momento de actualizar',
                          err
                      });
                  }
      
                  res.json({
                      ok: true,
                      msg: 'Departamento actualizado con exito',
                      departamento: dptoDB
                  });
              });
      });

      app.delete('/departamento/:id', function(req, res){
        let id = req.params.id;
    
        Departamento.findByIdAndUpdate(id, {estado: false }, {new: true, runValidators: true, context: 'query'},
        (err, dptoDB) =>{
          if (err){
                  return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrió un error al momento de eliminar.',
                    err
                  });
                }
                res.json({
                  ok: true,
                  msg: 'Departamento eliminado exitosamente.',
                  dptoDB 
                });
        });
      });
 
    module.exports = app;