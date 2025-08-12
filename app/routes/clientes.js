const express = require('express');
const router = express.Router();
const savoryModelClientes = require('../models/savoryModel');
const verificarToken = require('../Middlewares/auth');

router.get('/', verificarToken, async (req, res) => {
    try {
        const clientes = await savoryModelClientes.find();
        res.json(clientes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;