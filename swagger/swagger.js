const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de restaurante Savory',
      version: '1.0.0',
      description: 'API creada para la aplicación de restaurante Savory',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./app/routes/*.js', './swagger/*.js'], // Rutas con anotaciones swagger
};

const swaggerSpec = swaggerJSDoc(options);

// Función que configura Swagger en la app Express
function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
