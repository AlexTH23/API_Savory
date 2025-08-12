const mongoose = require('mongoose');

const savorySchemaPedidos = mongoose.Schema({
    producto:{
        type: String,
        required: true
    },
    usuario:{
        type: String,
        required: true
    },
    precioT:{
        type: Number,
        required: true
    },
    cantidad:{
        type: Number,
        required: true
    },
    direccion:{
        type: String,
        required: true
    },
    NoPedido:{
        type: Number,
        required: true
    }
})

const savoryModelPedidos = mongoose.model('pedidos',savorySchemaPedidos)
module.exports = savoryModelPedidos;