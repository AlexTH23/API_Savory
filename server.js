const app = require('./app/app')
const config = require('./app/config/config')
const conexion = require('./app/config/conexion')
const express = require('express');
const path = require('path');
require('dotenv').config();


conexion.connect()

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(config.PORT, '0.0.0.0', () =>{
    console.log(`Aplicacion corriendo en puerto ${config.PORT}`);
})