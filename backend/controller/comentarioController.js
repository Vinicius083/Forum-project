import comentarioServices from "../services/comentarioServices.js";

const comentarioController = {
  getComentarios: async (req, res) => {
    try {
      const comentarios = await comentarioServices.getComentarios(
        req.params.post_id
      );

      if (comentarios) {
        res.status(200).json(comentarios);
      } else {
        res.status(404).json({
          message: "Comentários não encontrados ou não há comentários",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Falha ao pegar comentários do post",
        error: error.message,
      });
    }
  },

  criarComentario: async (req, res) => {
    const { usuario_id, conteudo } = req.body;
    const { post_id } = req.params;
    const comentarioData = {
      conteudo,
      dh_criacao: new Date(),
    };

    try {
      const resultado = await comentarioServices.criarComentario(
        usuario_id,
        post_id,
        comentarioData
      );

      if (resultado.erro) {
        return res.status(400).json({
          message: "Falha ao criar comentário",
          error: resultado.erro,
        });
      }

      res.status(201).send({
        status: "ok",
        mensagem: "Comentário criado com sucesso",
        id: resultado.id,
      });
    } catch (error) {
      res.status(500).json({
        message: "Erro ao criar comentário",
        error: error.message,
      });
    }
  },

  comentarioLike: async (req, res) => {
    try {
      const like = await comentarioServices.comentarioLike(
        req.params.post_id,
        req.body.usuario_id,
        req.params.id,
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

  getComentarioLike: async (req, res) => {
    const { id } = req.params;
    const { usuario_id, tipo } = req.query;

    try {
      const like = await comentarioServices.getComentarioLike(
        usuario_id,
        id,
        tipo
      );
      console.log("LIKE:", like);
      if (like) {
        res.status(200).json({ message: "Like" });
      } else {
        res.status(200).json({ message: "Sem like" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Falha ao pegar like", error: error.message });
    }
  },

  deletarComentario: async (req, res) => {
    try {
      const deletado = await comentarioServices.deletarComentario(
        req.params.id
      );

      if (deletado) {
        res.status(200).json({ message: "Comentário deletado com sucesso" });
      } else {
        res.status(404).json({ message: "Comentário não encontrado" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Falha ao deletar comentário", error: error.message });
    }
  },
};

export default comentarioController;
