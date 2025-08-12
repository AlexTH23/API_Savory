const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');

const savorySchemaClientes = mongoose.Schema({
    usuario:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    nombreCompleto:{
        type: String,
        required: true
    },
    direccion:{
        type: String,
        required: true
    }
})


const savoryModelClientes = mongoose.model('clientes',savorySchemaClientes)
module.exports = savoryModelClientes;