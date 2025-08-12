const savoryModel = require('../models/savoryModel')

function buscarTodo(req, res) {
    savoryModel.find({})
    .then(clientes => {
        if (clientes.length) {
            return res.status(200).send({ clientes })
        }
        return res.status(204).send({ mensaje: "No hay nada que mostrar" })
    })
    .catch(e => {
        return res.status(404).send({ mensaje: `Error al solicitar la información ${e}` })
    })
}

function buscarcliente(req, res, next) {
    if (!req.body) req.body = {}
    let consulta = {}
    consulta[req.params.key] = req.params.value
    console.log(consulta)
    savoryModel.find(consulta)
    .then(clientes => {
        if (!clientes.length) return next()
        req.body.clientes = clientes
        return next()
    })
    .catch(e => {
        req.body.e = e
        return next()
    })
}

function mostrarClientes(req, res) {
    if (req.body.e) return res.status(404).send({ mensaje: "Error al consultar la información" })
    if (!req.body.clientes) return res.status(204).send({ mensaje: "No hay información que mostrar" })
    let clientes = req.body.clientes
    return res.status(200).send({ clientes })
}

function eliminarClientes(req, res) {
    var clientes = {}
    clientes = req.body.clientes
    savoryModel.deleteOne(clientes[0])
    .then(inf => {
        return res.status(200).send({ mensaje: "Se eliminó con éxito", inf })
    })
    .catch(e => {
        return res.status(404).send({ mensaje: "Error al eliminar la información", e })
    })
}

function actualizarClientes(req, res) {
    const filtro = { [req.params.key]: req.params.value }
    const nuevosDatos = req.body

    if (!Object.keys(nuevosDatos).length)
        return res.status(400).send({ message: "No hay datos para actualizar." })

    savoryModel.findOneAndUpdate(filtro, nuevosDatos, { new: true })
    .then(producto => producto
        ? res.status(200).send({ message: "Cliente actualizado", producto })
        : res.status(404).send({ message: "Clientes no encontrado" })
    )
    .catch(e => res.status(500).send({ message: "Error al actualizar", error: e }))
}

module.exports = {
    buscarTodo,
    buscarcliente,
    mostrarClientes,
    eliminarClientes,
    actualizarClientes
}