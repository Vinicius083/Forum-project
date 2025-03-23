"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, Snackbar } from "@mui/material";
import { logarUsuario } from "@/services/usuarioServices";
import "@/styles/style.css";
import "@/styles/loginRegister.css";
import "boxicons";

export default function Login() {
  const [sucessLogin, setSucessLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nomeUser, setNomeUser] = useState("");
  const [mostraSenha, setMostraSenha] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await logarUsuario(email, senha);
      localStorage.setItem("user", JSON.stringify(response));
      setSucessLogin(true);
      setNomeUser(response.nome);
      setNotification({
        open: true,
        message: "Login realizado com sucesso",
        severity: "success",
      });
      router.push("/home");
    } catch (error) {
      setNotification({
        open: true,
        message: error.message,
        severity: "error",
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <div className="body">
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          variant="filled"
        >
          {notification.message}
        </Alert>
      </Snackbar>

      <Snackbar
        open={sucessLogin}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={"success"}
          variant="filled"
        >
          {" "}
          Bem-vindo, {nomeUser}!
        </Alert>
      </Snackbar>
      <div className="wrapper">
        <form>
          <h1>Login</h1>
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
              className="ii"
            ></box-icon>
          </div>
          <div className="input_box">
            <input
              type={mostraSenha ? "text" : "password"}
              placeholder="Senha"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            ></input>
            <box-icon
              name={mostraSenha ? "lock-open-alt" : "lock-alt"}
              type="solid"
              color="#ffffff"
              className="ii"
              style={{ cursor: "pointer" }}
              onClick={() => setMostraSenha(!mostraSenha)}
            ></box-icon>
          </div>

          <button type="submit" className="btn" onClick={handleLogin}>
            Login
          </button>

          <div className="link-registro">
            <p>
              Não possui uma conta? <a href="../register">Cadastre-se</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
