const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const savoryModelClientes = require('../models/savoryModel');

const SECRET_KEY = 'mi_clave_secreta_super_segura';

router.post('/registro', async (req, res) => {
    try {
        const { usuario, password, email, nombreCompleto, direccion } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const nuevoUsuario = new savoryModelClientes({
            usuario,
            password: hashedPassword,
            email,
            nombreCompleto,
            direccion
        });

        await nuevoUsuario.save();
        res.status(201).json({ message: 'Usuario registrado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    const { usuario, password } = req.body;

    try {
        const user = await savoryModelClientes.findOne({ usuario });

        if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });

        const token = jwt.sign(
            { id: user._id, usuario: user.usuario },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
