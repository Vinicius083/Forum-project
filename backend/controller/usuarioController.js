import usuarioService from "../services/usuarioServices.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const jwtSecret = "jeff_e_massa";

const usuarioController = {
  criarUsuario: async (req, res) => {
    const senhaEncriptada = await bcrypt.hash(req.body.senha, 10);
    const novoUsuario = {
      nome: req.body.nome,
      email: req.body.email,
      senha: senhaEncriptada,
      apelido: req.body.apelido,
      profissao: req.body.profissao,
    };

    const resultado = await usuarioService.cadastrarUsuario(novoUsuario);

    if (resultado.erro)
      return res
        .status(500)
        .json({ message: "Falha ao criar usuário", error: resultado.erro });

    res.status(201).send({
      status: "ok",
      mensagem: "Usuário criado com sucesso",
      id: resultado.id,
    });
  },

  logarUsuario: async (req, res) => {
    try {
      const { email, senha } = req.body;
      const usuario = await usuarioService.getUsuarioPorEmail(email);

      if (!usuario) {
        return res.status(401).json({ message: "Email incorreto" });
      }

      const mesmaSenha = await bcrypt.compare(senha, usuario.senha);

      if (mesmaSenha) {
        const token = jwt.sign({ id: usuario.id }, jwtSecret, {
          expiresIn: "1h",
        });
        console.log(token);
        res.status(200).json({ token, usuario });
      } else {
        res.status(401).json({ message: "Senha incorreta" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Falha ao logar", error: error.message });
    }
  },

  uploadAvatar: async (req, res) => {
    try {
      const usuarioAvatar = await usuarioService.uploadAvatar(
        req.params.id,
        req.file
      );
      if (usuarioAvatar) {
        res.status(200).json({ message: "Upload de avatar feito com sucesso" });
      } else {
        res.status(404).json({ message: "Usuário não encontrado" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Falha ao fazer upload de avatar",
        error: error.message,
      });
    }
  },

  getUsuario: async (req, res) => {
    try {
      const usuario = await usuarioService.getUsuario(req.params.id);
      if (usuario) {
        res.status(200).json(usuario);
      } else {
        res.status(404).json({ message: "Usuário não encontrado" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Falha ao pegar usuário", error: error.message });
    }
  },

  atualizarUsuario: async (req, res) => {
    try {
      const { nome, email, senha, apelido, profissao } = req.body;

      const usuario = {
        nome,
        email,
        apelido,
        profissao,
      };

      if (senha && senha.trim() !== "") {
        usuario.senha = await bcrypt.hash(senha, 10);
      }

      const usuarioAtualizado = await usuarioService.atualizarUsuario(
        req.params.id,
        usuario
      );

      if (usuarioAtualizado) {
        res.status(200).json(usuarioAtualizado);
      } else {
        res.status(404).json({ message: "Usuário não encontrado" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Falha ao atualizar dados do usuário",
        error: error.message,
      });
    }
  },

  deletarUsuario: async (req, res) => {
    try {
      const resultado = await usuarioService.deletarUsuario(req.params.id);
      if (resultado) {
        res.status(200).json({ message: "Usuário deletado com sucesso" });
      } else {
        res.status(404).json({ message: "Usuário não encontrado" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Falha ao deletar usuário", error: error.message });
    }
  },

  getPostsDoUsuario: async (req, res) => {
    try {
      const posts = await usuarioService.getPostsDoUsuario(req.params.id);

      if (posts) {
        return res.status(200).json(posts);
      } else {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Falha ao pegar posts do usuário",
        error: error.message,
      });
    }
  },
};

export default usuarioController;
