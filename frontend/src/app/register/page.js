"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, Snackbar } from "@mui/material";
import { cadastrarUsuario } from "@/services/usuarioServices";
import "@/styles/style.css";
import "@/styles/register.css";
import "boxicons";

export default function RegisterPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [apelido, setApelido] = useState("");
  const [profissao, setProfissao] = useState("");
  const [notificacao, setNotificacao] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const router = useRouter();

  const emailValido = (email) => /\S+@\S+\.\S+/.test(email);
  const senhaValida = () => senha === confirmarSenha;

  const handleCadastrar = async (e) => {
    e.preventDefault();
    if (!emailValido(email)) {
      setNotificacao({
        open: true,
        message: "E-mail inválido",
        severity: "error",
      });
      return;
    }

    if (!senhaValida()) {
      setNotificacao({
        open: true,
        message: "Senhas não conferem",
        severity: "error",
      });
      return;
    }

    try {
      const usuario = {
        nome,
        email,
        senha,
        apelido,
        profissao,
      };
      const response = await cadastrarUsuario(usuario);
      setNotificacao({
        open: true,
        message: response.message,
        severity: "success",
      });
      router.push("/login");
    } catch (error) {
      setNotificacao({
        open: true,
        message: error.message,
        severity: "error",
      });
    }
  };

  const handleFecharNotificacao = () => {
    setNotificacao({ ...notificacao, open: false });
  };

  return (
    <div className="wrapperRegister">
      <Snackbar
        open={notificacao.open}
        autoHideDuration={3000}
        onClose={handleFecharNotificacao}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleFecharNotificacao}
          severity={notificacao.severity}
          variant="filled"
        >
          {notificacao.message}
        </Alert>
      </Snackbar>

      <form>
        <h1>Cadastre-se</h1>

        <div className="input_box">
          <input
            type="text"
            placeholder="Nome"
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          ></input>
          <box-icon name="user-pin" color="#ffffff" className="i"></box-icon>

          <input
            type="text"
            placeholder="Usuario"
            required
            value={apelido}
            onChange={(e) => setApelido(e.target.value)}
          ></input>
          <box-icon
            name="user"
            type="solid"
            color="#ffffff"
            className="ii"
          ></box-icon>
        </div>

        <div className="input_box">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <box-icon
            name="envelope"
            type="solid"
            color="#ffffff"
            className="i"
          ></box-icon>

          <input
            type="text"
            placeholder="Profissão"
            required
            value={profissao}
            onChange={(e) => setProfissao(e.target.value)}
          ></input>
          <box-icon
            type="solid"
            name="briefcase-alt"
            color="#ffffff"
            className="ii"
          ></box-icon>
        </div>

        <div className="input_box">
          <input
            type="password"
            placeholder="Senha"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          ></input>
          <box-icon
            name="lock-alt"
            type="solid"
            color="#ffffff"
            className="i"
          ></box-icon>

          <input
            type="password"
            placeholder="Confirmar senha"
            required
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          ></input>
          <box-icon
            name="lock-alt"
            type="solid"
            color="#ffffff"
            className="ii"
          ></box-icon>
        </div>

        <button type="submit" className="btn" onClick={handleCadastrar}>
          Cadastrar
        </button>

        <div className="link-registro">
          <p>
            Já possui uma conta? <a href="../login">login</a>
          </p>
        </div>
      </form>
    </div>
  );
}
