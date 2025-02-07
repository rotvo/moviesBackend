import { Router } from 'express';
import { deleteItem, getItemController, getItemsController, postItem, updateItem } from '../controllers/item';
import { logMiddleware } from '../middleware/log';

const router = Router();

// Middleware para logging
router.use(logMiddleware);

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: Endpoints para gestionar items
 */

/**
 * @swagger
 * /item:
 *   get:
 *     summary: Obtiene la lista de items
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: Lista de items obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Laptop"
 */
router.get('/', getItemsController);

/**
 * @swagger
 * /item/{id}:
 *   get:
 *     summary: Obtiene un item por ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID del item
 *     responses:
 *       200:
 *         description: Item encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Laptop"
 *       404:
 *         description: Item no encontrado
 */
router.get('/:id', getItemController);

/**
 * @swagger
 * /item:
 *   post:
 *     summary: Crea un nuevo item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Mouse"
 *     responses:
 *       201:
 *         description: Item creado exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post('/', postItem);

/**
 * @swagger
 * /item/{id}:
 *   put:
 *     summary: Actualiza un item por ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID del item a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Teclado"
 *     responses:
 *       200:
 *         description: Item actualizado exitosamente
 *       404:
 *         description: Item no encontrado
 */
router.put('/:id', updateItem);

/**
 * @swagger
 * /item/{id}:
 *   delete:
 *     summary: Elimina un item por ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID del item a eliminar
 *     responses:
 *       200:
 *         description: Item eliminado exitosamente
 *       404:
 *         description: Item no encontrado
 */
router.delete('/:id', deleteItem);

export { router };
