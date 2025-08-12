const express = require('express');
const router = express.Router();
const verifyToken = require('../Middlewares/auth');
const savoryController = require('../Controllers/savoryController');
const savoryControllerProducto = require('../Controllers/savoryControllerProducto');
const savoryControllerUsers = require('../Controllers/savoryControllerUsers');

const authRoutes = require('./auth');
const clientesRoutes = require('./clientes');

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Endpoints de autenticación
 *   - name: Clientes
 *     description: Gestión de clientes
 *   - name: Pedidos
 *     description: Gestión de pedidos
 *   - name: Productos
 *     description: Gestión de productos
 */

router.use('/auth', authRoutes);         
router.use('/clientes', clientesRoutes);

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Obtener todos los clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes
 */
router.get('/clientes',verifyToken, savoryControllerUsers.buscarTodo);

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Registrar un nuevo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuario
 *               - password
 *               - email
 *               - nombreCompleto
 *               - direccion
 *             properties:
 *               usuario:
 *                 type: string
 *                 example: juan123
 *               password:
 *                 type: string
 *                 example: 123456
 *               email:
 *                 type: string
 *                 example: juan@example.com
 *               nombreCompleto:
 *                 type: string
 *                 example: Juan Pérez
 *               direccion:
 *                 type: string
 *                 example: Calle Falsa 123
 *     responses:
 *       201:
 *         description: Cliente registrado exitosamente
 *       400:
 *         description: Faltan datos obligatorios
 *       409:
 *         description: El usuario ya existe
 *       500:
 *         description: Error interno al registrar el cliente
 */
router.post('/', savoryControllerUsers.agregarCliente);

/**
 * @swagger
 * /clientes/{key}/{value}:
 *   get:
 *     summary: Buscar y mostrar clientes
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *         description: Campo por el que se buscará el cliente (por ejemplo "id" o "nombre").
 *       - in: path
 *         name: value
 *         required: true
 *         schema:
 *           type: string
 *         description: Valor del campo a buscar.
 *     responses:
 *       200:
 *         description: Cliente encontrado
 */
router.get('/clientes/:key/:value',verifyToken, savoryControllerUsers.buscarcliente, savoryControllerUsers.mostrarClientes);

/**
 * @swagger
 * /clientes/{key}/{value}:
 *   delete:
 *     summary: Eliminar un cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *         description: Campo por el que se buscará el cliente.
 *       - in: path
 *         name: value
 *         required: true
 *         schema:
 *           type: string
 *         description: Valor del campo del cliente a eliminar.
 *     responses:
 *       200:
 *         description: Cliente eliminado
 */
router.delete('/clientes/:key/:value',verifyToken, savoryControllerUsers.buscarcliente, savoryControllerUsers.eliminarClientes);

/**
 * @swagger
 * /clientes/{key}/{value}:
 *   put:
 *     summary: Actualizar datos de un cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *         description: Campo por el que se buscará el cliente.
 *       - in: path
 *         name: value
 *         required: true
 *         schema:
 *           type: string
 *         description: Valor del campo del cliente a actualizar.
 *     responses:
 *       200:
 *         description: Cliente actualizado
 */
router.put('/clientes/:key/:value',verifyToken, savoryControllerUsers.buscarcliente, savoryControllerUsers.actualizarClientes);


/**
 * @swagger
 * /Pedidos:
 *   get:
 *     summary: Obtener todos los pedidos
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Lista de pedidos
 */
router.get('/Pedidos',verifyToken, savoryController.buscarTodo);

/**
 * @swagger
 * /Pedidos:
 *   post:
 *     summary: Agregar un nuevo pedido
 *     tags: [Pedidos]
 *     responses:
 *       201:
 *         description: Pedido creado
 */
router.post('/Pedidos',verifyToken, savoryController.agregar);

/**
 * @swagger
 * /Pedidos/{key}/{value}:
 *   get:
 *     summary: Buscar y mostrar pedido
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: value
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido encontrado
 */
router.get('/Pedidos/:key/:value',verifyToken, savoryController.buscarpedido, savoryController.mostrarPedido);

/**
 * @swagger
 * /Pedidos/{key}/{value}:
 *   delete:
 *     summary: Eliminar un pedido
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: value
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido eliminado
 */
router.delete('/Pedidos/:key/:value',verifyToken, savoryController.buscarpedido, savoryController.eliminarPedido);

/**
 * @swagger
 * /Pedidos/{key}/{value}:
 *   put:
 *     summary: Actualizar un pedido
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: value
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido actualizado
 */
router.put('/Pedidos/:key/:value',verifyToken, savoryController.buscarpedido, savoryController.actualizarPedido);

/**
 * @swagger
 * /Productos:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos
 */
router.get('/Productos',verifyToken, savoryControllerProducto.buscarTodo);

/**
 * @swagger
 * /Productos:
 *   post:
 *     summary: Agregar un nuevo producto
 *     tags: [Productos]
 *     responses:
 *       201:
 *         description: Producto creado
 */
router.post('/Productos',verifyToken, savoryControllerProducto.agregar);

/**
 * @swagger
 * /Productos/{key}/{value}:
 *   get:
 *     summary: Buscar y mostrar producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: value
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto encontrado
 */
router.get('/Productos/:key/:value',verifyToken, savoryControllerProducto.buscarProducto, savoryControllerProducto.mostrarProducto);

/**
 * @swagger
 * /Productos/{key}/{value}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: value
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado
 */
router.delete('/Productos/:key/:value',verifyToken, savoryControllerProducto.buscarProducto, savoryControllerProducto.eliminarProducto);

/**
 * @swagger
 * /Productos/{key}/{value}:
 *   put:
 *     summary: Actualizar un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: value
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto actualizado
 */
router.put('/Productos/:key/:value', savoryControllerProducto.buscarProducto, savoryControllerProducto.actualizarProducto);

module.exports = router;
