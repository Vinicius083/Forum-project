import db from "../models/index.js";

const Like = db.Like;
const Post = db.Post;
const Comentario = db.Comentario;

const likeService = {
  postLike: async (usuario_id, post_id, tipo) => {
    if (!["post"].includes(tipo)) {
      throw new Error("Tipo inválido. Deve ser 'post'.");
    }

    const existeLike = await Like.findOne({
      where: { usuario_id, post_id, tipo },
    });

    if (existeLike) {
      await existeLike.destroy();

      await Post.increment({ qtd_curtidas: -1 }, { where: { id: post_id } });

      return { message: "Like removido." };
    } else {
      await Like.create({ usuario_id, post_id, tipo });

      await Post.increment({ qtd_curtidas: 1 }, { where: { id: post_id } });

      return { message: "Like adicionado." };
    }
  },

  comentarioLike: async (usuario_id, post_id, comentario_id, tipo) => {
    if (!["comentário"].includes(tipo)) {
      throw new Error("Tipo inválido. Deve ser 'comentário'.");
    }

    const existeLike = await Like.findOne({
      where: { usuario_id, post_id, comentario_id: comentario_id, tipo },
    });

    if (existeLike) {
      await existeLike.destroy();

      await Comentario.increment(
        { qtd_curtidas: -1 },
        { where: { id: comentario_id } }
      );

      return { message: "Like removido." };
    } else {
      await Like.create({ usuario_id, post_id, comentario_id, tipo });

      await Comentario.increment(
        { qtd_curtidas: 1 },
        { where: { id: comentario_id } }
      );
      return { message: "Like adicionado." };
    }
  },

  getPostLike: async (post_id, usuario_id, tipo) => {
    const existeLike = await Like.findOne({
      where: { usuario_id, post_id, tipo },
    });
    if (existeLike) {
      return existeLike;
    } else {
      return null;
    }
  },

  getComentarioLike: async (usuario_id, comentario_id, tipo) => {
    const existeLike = await Like.findOne({
      where: { comentario_id, usuario_id, tipo },
    });
    if (existeLike) {
      return existeLike;
    } else {
      return null;
    }
  },
};

export default likeService;
