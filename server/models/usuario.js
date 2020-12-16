const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario.']
    },
    primerApellido: {
        type: String,
        required: [true, 'El primer apellido necesario.']
    },
    segundoApellido: {
        type: String,
        required: [true, 'El segundo apellido es  Paterno necesario.']
    },
    edad:{
        type: Number, 
        required: [true, 'La edad es necesaria']
    },
    curp:{
        type: String,
        required: [true, 'Es necesaria la curp']
    },
    telefono:{
        type: Number,
        required: [true, 'El numero de telefono es necesario']
    },
    mail:{
        type: String,
        unique: [true, 'El email es necesaria']
    },
    activo:{
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Usuario', usuarioSchema);