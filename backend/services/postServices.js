import db from "../models/index.js";
import likeService from "./likeServices.js";

const Post = db.Post;
const Usuario = db.Usuario;

const postService = {
  getTimeline: async () => {
    try {
      const posts = await Post.findAll({
        include: [
          {
            model: Usuario,
            as: "usuario",
            attributes: ["avatar", "apelido"],
          },
        ],
        order: [["dh_criacao", "DESC"]],
      });
      return posts;
    } catch (error) {
      console.log(error);
      return { erro: "Erro ao buscar posts" };
    }
  },

  getPostsMaisCurtidos: async () => {
    try {
      const posts = await Post.findAll({
        order: [["qtd_curtidas", "DESC"]],
      });
      return posts;
    } catch (error) {
      return { erro: "Erro ao buscar posts mais curtidos" };
    }
  },

  getUserInfo: async (usuario_id) => {
    try {
      const usuario = await Usuario.findByPk(usuario_id, {
        attributes: ["avatar", "apelido"],
      });
      return usuario || { erro: "Usuário não encontrado" };
    } catch (error) {
      return { erro: "Erro ao buscar informações do usuário" };
    }
  },

  postPorId: async (id) => {
    try {
      const post = await Post.findByPk(id, {
        include: [
          {
            model: Usuario,
            as: "usuario",
            attributes: ["avatar", "apelido"],
          },
        ],
      });

      return post;
    } catch (error) {
      return null;
    }
  },

  criarPost: async (usuario_id, postData) => {
    try {
      const usuario = await Usuario.findByPk(usuario_id);
      if (usuario) {
        const post = await Post.create(postData);
        return post;
      } else {
        return { erro: "Usuário não encontrado" };
      }
    } catch (error) {
      console.log(error);
      return { erro: "Erro ao criar post" };
    }
  },

  atualizarPost: async (id, postData) => {
    const [post] = await Post.update(postData, { where: { id } });
    console.log(post);
    if (post) {
      return await Post.findByPk(id);
    } else {
      return null;
    }
  },

  postLike: async (id, usuario_id, tipo) => {
    const post = await Post.findByPk(id);
    const usuario = await Usuario.findByPk(usuario_id);

    if (post && usuario) {
      const like = await likeService.postLike(usuario_id, id, tipo);
      return like;
    } else {
      return null;
    }
  },

  getLike: async (id, usuario_id, tipo) => {
    const post = await Post.findByPk(id);
    if (post) {
      const like = await likeService.getLike(id, usuario_id, tipo);
      console.log("like:", like);
      return like;
    } else {
      return null;
    }
  },

  deletePost: async (id) => {
    const deletado = await Post.findByPk(id);

    if (deletado) {
      return await Post.destroy({ where: { id } });
    } else {
      return null;
    }
  },
};

export default postService;
