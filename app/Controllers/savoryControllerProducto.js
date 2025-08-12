const savoryModelProductos = require('../models/savoryModelProductos')

function buscarTodo(req, res) {
    savoryModelProductos.find({})
    .then(productos => {
        if (productos.length) {
            return res.status(200).send({ productos })
        }
        return res.status(204).send({ mensaje: "No hay nada que mostrar" })
    })
    .catch(e => {
        return res.status(404).send({ mensaje: `Error al solicitar la información ${e}` })
    })
}

function agregar(req, res) {
    new savoryModelProductos(req.body).save()
    .then(info => {
        return res.status(200).send({ mensaje: "Se guardó con éxito", info })
    })
    .catch(e => {
        return res.status(404).send({ mensaje: `Error al guardar la información ${e}` })
    })
}

function buscarProducto(req, res, next) {
    if (!req.body) req.body = {}
    let consulta = {}
    consulta[req.params.key] = req.params.value
    console.log(consulta)
    savoryModelProductos.find(consulta)
    .then(productos => {
        if (!productos.length) return next()
        req.body.productos = productos
        return next()
    })
    .catch(e => {
        req.body.e = e
        return next()
    })
}

function mostrarProducto(req, res) {
    if (req.body.e) return res.status(404).send({ mensaje: "Error al consultar la información" })
    if (!req.body.productos) return res.status(204).send({ mensaje: "No hay información que mostrar" })
    let productos = req.body.productos
    return res.status(200).send({ productos })
}

function eliminarProducto(req, res) {
    var productos = {}
    productos = req.body.productos
    savoryModelProductos.deleteOne(productos[0])
    .then(inf => {
        return res.status(200).send({ mensaje: "Se eliminó con éxito", inf })
    })
    .catch(e => {
        return res.status(404).send({ mensaje: "Error al eliminar la información", e })
    })
}

function actualizarProducto(req, res) {
    const filtro = { [req.params.key]: req.params.value }
    const nuevosDatos = req.body

    if (!Object.keys(nuevosDatos).length)
        return res.status(400).send({ message: "No hay datos para actualizar." })

    savoryModelProductos.findOneAndUpdate(filtro, nuevosDatos, { new: true })
    .then(producto => producto
        ? res.status(200).send({ message: "Producto actualizado", producto })
        : res.status(404).send({ message: "Producto no encontrado" })
    )
    .catch(e => res.status(500).send({ message: "Error al actualizar", error: e }))
}

module.exports = {
    buscarTodo,
    agregar,
    buscarProducto,
    mostrarProducto,
    eliminarProducto,
    actualizarProducto
}