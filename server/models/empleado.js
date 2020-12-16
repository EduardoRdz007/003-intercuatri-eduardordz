const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let empleadoSchema = new Schema({
    nombredepuesto: {
        type: String,
        required: [true, 'El nombre de puesto es necesario.']
    },
    id_usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },

    id_departamento: {
        type: Schema.Types.ObjectId,
        ref: 'Departamento'
    },
    anosdeservicio: {
        type: Number,
        required: true
    },
    hora_entrada: {
        type: Number,
        default: 7
    },
    hora_salida:{
        type: Number, 
        default: 21
    },
    activo:{
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Empleado', empleadoSchema);