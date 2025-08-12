const express = require('express');
const router = express.Router();
const menuController = require('../Controllers/menuController');
const upload = require('../Middlewares/uploadMiddleware');

/**
 * @swagger
 * tags:
 *   name: Menú
 *   description: Gestión de platillos del restaurante
 */

/**
 * @swagger
 * /menu:
 *   get:
 *     summary: Obtener todos los platillos
 *     tags: [Menú]
 *     responses:
 *       200:
 *         description: Lista de platillos obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/menu', menuController.buscarTodo);

/**
 * @swagger
 * /menu:
 *   post:
 *     summary: Agregar un nuevo platillo
 *     tags: [Menú]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: number
 *               imagen:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Platillo agregado exitosamente
 */
router.post('/menu', upload.single('imagen'), menuController.agregar);

/**
 * @swagger
 * /menu/{key}/{value}:
 *   get:
 *     summary: Obtener un platillo por clave y valor
 *     tags: [Menú]
 *     parameters:
 *       - in: path
 *         name: key
 *         schema:
 *           type: string
 *         required: true
 *         description: Clave para buscar (por ejemplo, "id" o "nombre")
 *       - in: path
 *         name: value
 *         schema:
 *           type: string
 *         required: true
 *         description: Valor asociado a la clave para buscar el platillo
 *     responses:
 *       200:
 *         description: Platillo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Platillo no encontrado
 */
router.get('/menu/:key/:value', menuController.buscarPlatillo, menuController.mostrarPlatillo);

/**
 * @swagger
 * /menu/{key}/{value}:
 *   delete:
 *     summary: Eliminar un platillo por clave y valor
 *     tags: [Menú]
 *     parameters:
 *       - in: path
 *         name: key
 *         schema:
 *           type: string
 *         required: true
 *         description: Clave para buscar el platillo a eliminar
 *       - in: path
 *         name: value
 *         schema:
 *           type: string
 *         required: true
 *         description: Valor asociado a la clave para eliminar el platillo
 *     responses:
 *       200:
 *         description: Platillo eliminado exitosamente
 *       404:
 *         description: Platillo no encontrado
 */
router.delete('/menu/:key/:value', menuController.buscarPlatillo, menuController.eliminarPlatillo);

/**
 * @swagger
 * /menu/{name}:
 *   patch:
 *     summary: Actualizar un platillo por nombre
 *     tags: [Menú]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre del platillo a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: number
 *               imagen:
 *                 type: string
 *                 format: binary
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: number
 *     responses:
 *       200:
 *         description: Platillo actualizado exitosamente
 *       404:
 *         description: Platillo no encontrado
 */
router.patch(
  '/menu/:name',
  (req, res, next) => {
    const contentType = (req.headers['content-type'] || '');
    if (contentType.includes('multipart/form-data')) {
      upload.single('imagen')(req, res, next);
    } else {
      next();
    }
  },
  menuController.actualizarPlatillo
);

module.exports = router;
