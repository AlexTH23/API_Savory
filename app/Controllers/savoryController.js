const savoryModelPedidos = require('../models/savoryModelPedidos')

function buscarTodo(req,res) {
    savoryModelPedidos.find({})
    .then(pedidos =>{
        if(pedidos.length){
            return res.status(200).send({pedidos})
        }
        return res.status(204).send({mensaje:"No hay nada que mostrar"})
    })
    .catch(e =>{return res.status(404).send({mensaje:`Error al solicitar la informacion ${e}`})})
}

function agregar(req,res) {
    new savoryModelPedidos(req.body).save()
    .then(info =>{
        return res.status(200).send({mensaje:"Se guardo con exito",info})
    })
    .catch(e =>{
        return res.status(404).send({mensaje:`Error al guardar la informacion ${e}`})
    })
}

function buscarpedido(req, res, next) {
    if(!req.body)req.body={}
    let consulta={}
    consulta[req.params.key]=req.params.value
    console.log(consulta)
    savoryModelPedidos.find(consulta)
    .then(pedidos =>{
        if(!pedidos.length) return next()
        req.body.pedidos = pedidos
        return next()
    })
    .catch(e=>{
        req.body.e = e
        return next()
    })
}

function mostrarPedido(req, res) {
    if(req.body.e) return res.status(404).send({mensaje:"error al consultar la informacion"})
    if(!req.body.pedidos) return res.status(204).send({mensaje:"no hay informacion que mostrar"})
    let pedidos = req.body.pedidos
        return res.status(200).send({pedidos})
}

function eliminarPedido(req, res) {
    var pedidos={}
    pedidos = req.body.pedidos
    savoryModelPedidos.deleteOne(pedidos[0])
    .then(inf =>{
        return res.status(200).send({mensaje:"Se elimino con exito",inf})
    })
    .catch(e =>{
        return res.status(404).send({mensaje:"Error al eliminar la informacion", e})
    })
}

function actualizarPedido(req, res) {
  const filtro = { [req.params.key]: req.params.value };
  const nuevosDatos = req.body;

  if (!Object.keys(nuevosDatos).length)
    return res.status(400).send({ message: "No hay datos para actualizar." });

  savoryModelPedidos.findOneAndUpdate(filtro, nuevosDatos, { new: true })
    .then(pedidos => pedidos
      ? res.status(200).send({ message: "Producto actualizado", pedidos })
      : res.status(404).send({ message: "Producto no encontrado" })
    )
    .catch(e => res.status(500).send({ message: "Error al actualizar", error: e }));
}

module.exports={
    buscarTodo,
    agregar,
    buscarpedido,
    mostrarPedido,
    eliminarPedido,
    actualizarPedido
}