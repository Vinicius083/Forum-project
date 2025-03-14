import postService from "../services/postServices.js";

const postController = {
  getTimeline: async (req, res) => {
    const resultado = await postService.getTimeline();
    if (resultado.erro) return res.status(400).json(resultado);

    res.status(200).json(resultado);
  },

  getPostsMaisCurtidos: async (req, res) => {
    const resultado = await postService.getPostsMaisCurtidos();
    if (resultado.erro) return res.status(400).json(resultado);

    res.status(200).json(resultado);
  },

  postPorId: async (req, res) => {
    try {
      const post = await postService.postPorId(req.params.id);
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post não encontrado" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar post", error: error.message });
    }
  },

  criarPost: async (req, res) => {
    const { usuario_id, titulo, conteudo } = req.body;
    const postData = {
      titulo,
      conteudo,
      usuario_id: usuario_id,
      dh_criacao: new Date(),
    };
    const resultado = await postService.criarPost(usuario_id, postData);

    if (resultado.erro)
      return res
        .status(400)
        .json({ message: "Falha ao criar post", error: resultado.erro });

    res.status(201).send({
      status: "ok",
      mensagem: "Post criado com sucesso",
      id: resultado.id,
    });
  },

  atualizarPost: async (req, res) => {
    try {
      const post = await postService.atualizarPost(req.params.id, req.body);

      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post não encontrado" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Falha ao atualizar dados do usuário",
        error: error.message,
      });
    }
  },

  postLike: async (req, res) => {
    try {
      const like = await postService.postLike(
        req.params.id,
        req.body.usuario_id,
        req.body.tipo
      );

      if (like) {
        res.status(200).json({ message: "Quantidade de likes atualizado" });
      } else {
        res.status(404).json({ message: "Post não encontrado" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Falha ao incrementar like", error: error.message });
    }
  },

  getLike: async (req, res) => {
    const { id } = req.params;
    const { usuario_id, tipo } = req.query;

    try {
      const like = await postService.getLike(id, usuario_id, tipo);
      if (like) {
        res.status(200).json({ message: "Like" });
      } else {
        res.status(200).json({ message: "Sem like" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Falha ao verificar like", error: error.message });
    }
  },

  deletePost: async (req, res) => {
    try {
      const deletado = await postService.deletePost(req.params.id);

      if (deletado) {
        res.status(200).json({ message: "Post deletado com sucesso" });
      } else {
        res.status(404).json({ message: "Post não encontrado" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Falha ao deletar post", error: error.message });
    }
  },
};

export default postController;
