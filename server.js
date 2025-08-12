const app = require('./app/app')
const config = require('./app/config/config')
const conexion = require('./app/config/conexion')
const express = require('express');
const path = require('path');
const { swaggerUi, swaggerSpec } = require('./swagger/swagger');



conexion.connect()

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


//Swagger middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(config.PORT, '0.0.0.0', () =>{
    console.log(`Aplicacion corriendo en puerto ${config.PORT}`);
})