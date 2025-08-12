const express =  require('express');
const app = express();
const routerMenu = require('./routes/menuRouter')
const routerSavory = require('./routes/savoryrouter')
const cors = require('cors')
const fs = require('fs');
const path = require('path');
const setupSwagger = require('../swagger/swagger');



app.use(express.urlencoded({extended:false}));
app.use (express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configuración Swagger
setupSwagger(app);

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400
}));
app.use('/savory', routerMenu);
app.use('/savory',routerSavory)

module.exports=app;