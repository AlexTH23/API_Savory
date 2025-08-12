const mongoose = require('mongoose');

const savorySchemaProductos = mongoose.Schema({
    nombre_producto:{
        type: String,
        required: true
    },
    precio:{
        type: Number,
        required: true
    },
    descripcion:{
        type: String,
        required: true
    },
    cantidad:{
        type: Number,
        required: true
    }
})

const savoryModelProductos = mongoose.model('producto',savorySchemaProductos)
module.exports = savoryModelProductos;