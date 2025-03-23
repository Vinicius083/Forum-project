import { where } from "sequelize";
import db from "../models/index.js";
import likeService from "./likeServices.js";

const Usuario = db.Usuario;
const Post = db.Post;
const Comentario = db.Comentario;

const comentarioServices = {
  getComentarios: async (post_id) => {
    const comentarios = await Comentario.findAll({
      where: { post_id: post_id },
      include: [
        {
          model: Usuario,
          as: "usuario",
          attributes: ["avatar", "apelido"],
        },
      ],
      order: [["dh_criacao", "DESC"]],
    });

    if (comentarios) {
      return comentarios;
    } else {
      return null;
    }
  },

  criarComentario: async (usuario_id, post_id, comentarioData) => {
    const usuario = await Usuario.findByPk(usuario_id);
    const post = await Post.findByPk(post_id);

    if (!usuario) {
      return { erro: "Usuário não encontrado" };
    }

    if (!post) {
      return { erro: "Post não encontrado" };
    }

    const comentario = await Comentario.create({
      ...comentarioData,
      usuario_id,
      post_id,
    });

    return comentario;
  },

  comentarioLike: async (post_id, usuario_id, comentario_id, tipo) => {
    const comentario = await Comentario.findByPk(comentario_id);
    const usuario = await Usuario.findByPk(usuario_id);

    if (usuario && comentario) {
      const like = await likeService.comentarioLike(
        usuario_id,
        post_id,
        comentario_id,
        tipo
      );
      return like;
    } else {
      return null;
    }
  },

  getComentarioLike: async (usuario_id, comentario_id, tipo) => {
    const comentario = await Comentario.findByPk(comentario_id);
    console.log(comentario);

    if (comentario) {
      const like = await likeService.getComentarioLike(
        usuario_id,
        comentario_id,
        tipo
      );
      return like;
    } else {
      return null;
    }
  },

  deletarComentario: async (id) => {
    const comentario = await Comentario.findByPk(id);

    if (comentario) {
      return await Comentario.destroy({ where: { id } });
    } else {
      return null;
    }
  },
};

export default comentarioServices;
