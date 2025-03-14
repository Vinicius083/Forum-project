import express from "express";
import comentarioController from "../controller/comentarioController.js";

const router = express.Router();

/**
 * @swagger
 * /posts/{post_id}/comentarios:
 *   get:
 *     summary: Obter comentários de um post pelo ID
 *     tags: [Comentários]
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do post
 *     responses:
 *       200:
 *         description: Comentários encontrados
 *       404:
 *         description: Post ou comentários não encontrados
 */
router.get("/:post_id/comentarios", comentarioController.getComentarios);

/**
 * @swagger
 * /posts/{post_id}/comentarios:
 *   post:
 *     summary: Criar um novo comentário em um post
 *     tags: [Comentários]
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario_id:
 *                 type: integer
 *               conteudo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comentário criado com sucesso
 *       400:
 *         description: Falha ao criar comentário
 */
router.post("/:post_id/comentarios", comentarioController.criarComentario);

/**
 * @swagger
 * /posts/{post_id}/comentarios/{id}/like:
 *   post:
 *     summary: Incrementar likes de um comentário pelo ID
 *     tags: [Comentários]
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do post
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do comentário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario_id:
 *                 type: integer
 *               tipo:
 *                 type: string
 *                 enum: [comentário]
 *     responses:
 *       200:
 *         description: Likes incrementados com sucesso
 *       404:
 *         description: Comentário não encontrado
 */
router.post("/:post_id/comentarios/:id/like", comentarioController.comentarioLike);

/**
 * @swagger
 * /posts/{post_id}/comentarios/{id}:
 *   delete:
 *     summary: Deletar um comentário pelo ID
 *     tags: [Comentários]
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do post
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do comentário
 *     responses:
 *       200:
 *         description: Comentário deletado com sucesso
 *       404:
 *         description: Comentário não encontrado
 */
router.delete("/:post_id/comentarios/:id", comentarioController.deletarComentario);

export default router;