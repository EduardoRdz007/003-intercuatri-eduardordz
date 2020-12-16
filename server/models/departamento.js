const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let departamentoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del departamento']
    },
    id_jefe_de_area: {
        type: Schema.Types.ObjectId,
        ref: 'Jefe_De_Área'
    },
    numero_de_empleado: {
        type: Number,
        required: true
    },
    extension_tel: {
        type: Number,
        default: true
    },
    activo:{
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Departamento', departamentoSchema);