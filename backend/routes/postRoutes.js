import express from "express";
import postController from "../controller/postController.js";

const router = express.Router();

/**
 * @swagger
 * /posts/timeline:
 *   get:
 *     summary: Obter a timeline de posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Timeline de posts
 *       500:
 *         description: Erro ao buscar posts
 */
router.get("/timeline", postController.getTimeline);

/**
 * @swagger
 * /posts/mais-curtidos:
 *   get:
 *     summary: Obter os posts mais curtidos
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Posts mais curtidos
 *       500:
 *         description: Erro ao buscar posts mais curtidos
 */
router.get("/mais-curtidos", postController.getPostsMaisCurtidos);


/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Obter um post pelo ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do post
 *     responses:
 *       200:
 *         description: Post encontrado
 *       404:
 *         description: Post não encontrado
 */
router.get("/:id", postController.postPorId);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Criar um novo post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario_id:
 *                 type: integer
 *               titulo:
 *                 type: string
 *               conteudo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post criado com sucesso
 *       400:
 *         description: Falha ao criar post
 */
router.post("/", postController.criarPost);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Atualizar um post pelo ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
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
 *               titulo:
 *                 type: string
 *               conteudo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post atualizado com sucesso
 *       404:
 *         description: Post não encontrado
 */
router.put("/:id", postController.atualizarPost);

/**
 * @swagger
 * /posts/{id}/like:
 *   post:
 *     summary: Incrementar likes de um post pelo ID
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *               tipo:
 *                 type: string
 *                 enum: [post]
 *     responses:
 *       200:
 *         description: Likes incrementados com sucesso
 *       404:
 *         description: Post não encontrado
 */
router.post("/:id/like", postController.postLike);

/**
 * @swagger
 * /posts/{id}/like:
 *   get:
 *     summary: Verificar se um post foi curtido pelo usuário
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do post
 *       - in: query
 *         name: usuario_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *       - in: query
 *         name: tipo
 *         required: true
 *         schema:
 *           type: string
 *           enum: [post]
 *         description: Tipo de like
 *     responses:
 *       200:
 *         description: Like verificado
 *       404:
 *         description: Post não encontrado
 */
router.get("/:id/like", postController.getLike)

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Deletar um post pelo ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do post
 *     responses:
 *       200:
 *         description: Post deletado com sucesso
 *       404:
 *         description: Post não encontrado
 */
router.delete("/:id", postController.deletePost);

export default router;
