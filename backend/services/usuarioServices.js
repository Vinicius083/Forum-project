import db from "../models/index.js";
import validator from "validator";

const Usuario = db.Usuario;
const Post = db.Post;

const usuarioService = {
  cadastrarUsuario: async (novoUsuario) => {
    if (
      !novoUsuario.nome ||
      !novoUsuario.email ||
      !novoUsuario.senha ||
      !novoUsuario.apelido ||
      !novoUsuario.profissao
    )
      return { erro: "Envie todos os campos obrigatórios" };

    if (!validator.isEmail(novoUsuario.email))
      return { erro: "E-mail inválido" };

    if (
      novoUsuario.senha.length < 8 ||
      !validator.isStrongPassword(novoUsuario.senha, {
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      return {
        erro: "A senha deve conter pelo menos 8 caracteres, incluindo ao menos uma letra maiúscula, uma letra minúscula e um número.",
      };
    }

    const emailExiste = await Usuario.findOne({
      where: { email: novoUsuario.email },
    });
    if (emailExiste) return { erro: "E-mail já cadastrado" };

    const apelidoExiste = await Usuario.findOne({
      where: { apelido: novoUsuario.apelido },
    });
    if (apelidoExiste) return { erro: "Apelido já cadastrado" };

    try {
      const resultado = await Usuario.create(novoUsuario);
      return resultado;
    } catch (error) {
      return { erro: "Erro ao inserir usuário no banco" };
    }
  },

  getUsuarioPorEmail: async (email) => {
    try {
      const usuarioExiste = await Usuario.findOne({ where: { email } });

      if (!usuarioExiste) return null;

      return usuarioExiste;
    } catch (error) {
      return { erro: "Erro ao buscar usuário no banco" };
    }
  },

  getUsuario: async (id) => {
    return await Usuario.findByPk(id);
  },

  getTodosOsUsuarios: async () => {
    return await Usuario.findAll();
  },

  getPostsDoUsuario: async (id) => {
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
        where: { usuario_id: id },
      });
      return posts;
    } catch (error) {
      return { erro: "Erro ao buscar posts do usuário" };
    }
  },

  atualizarUsuario: async (id, data) => {
    const [atualizado] = await Usuario.update(data, { where: { id } });

    if (atualizado) {
      return await Usuario.findByPk(id);
    }
    return null;
  },

  deletarUsuario: async (id) => {
    const deletado = await Usuario.destroy({ where: { id } });
    return deletado;
  },

  uploadAvatar: async (id, file) => {
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
      const avatar = file ? file.buffer : null;
      await Usuario.update({ avatar }, { where: { id } });
    }
    return usuario;
  },
};

export default usuarioService;
