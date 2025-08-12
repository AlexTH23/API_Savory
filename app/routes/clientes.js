const express = require('express');
const router = express.Router();
const savoryModelClientes = require('../models/savoryModel');
const verificarToken = require('../Middlewares/auth');
const savoryControllerUsers = require('../Controllers/savoryControllerUsers');

router.get('/', verificarToken, async (req, res) => {
    try {
        const clientes = await savoryModelClientes.find();
        res.json(clientes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.post('/', savoryControllerUsers.agregarCliente);

module.exports = router;