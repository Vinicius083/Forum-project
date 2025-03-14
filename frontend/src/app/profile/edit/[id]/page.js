"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Container, Box, Typography } from "@mui/material";
import {
  buscarUsuarioPorId,
  atualizarUsuario,
  atualizarAvatarUsuario,
} from "@/services/usuarioServices";
import UploadAvatar from "@/components/usuario/UploadAvatar";
import ProfileForm from "@/components/usuario/ProfileForm";
import Navbar from "@/components/Navbar";
import "@/styles/style.css";

const EditProfilePage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [apelido, setApelido] = useState("");
  const [profissao, setProfissao] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const fetchUsuario = async () => {
      if (id) {
        try {
          const data = await buscarUsuarioPorId(id);
          setUsuario(data);
          setNome(data.nome);
          setEmail(data.email);
          setApelido(data.apelido);
          setProfissao(data.profissao);
          setAvatar(data.avatar);
        } catch (error) {
          console.error("Erro ao buscar usuário:", error);
        }
      }
    };

    fetchUsuario();
  }, [id]);

  const handleUpdateProfile = async () => {
    try {
      const dadosAtualizados = {
        nome,
        email,
        apelido,
        profissao,
      };

      if (senha.trim() !== "") {
        dadosAtualizados.senha = senha;
      }

      await atualizarUsuario(id, dadosAtualizados);

      if (avatar && avatar !== usuario.avatar) {
        const formData = new FormData();
        formData.append("avatar", avatar);

        await atualizarAvatarUsuario(id, formData);
      }

      router.push(`/profile/`);
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
    }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatar(file);
    }
  };

  if (!usuario) return <div>Carregando...</div>;

  return (
    <div className="generalProfileEdit">
      <Navbar
        avatar={usuario?.avatar}
        apelido={usuario?.apelido}
        nome={usuario?.nome}
      />
      <div className="contentProfileEdit">
        <Typography variant="h4" component="h1" color="white" gutterBottom>
          Atualizar Perfil
        </Typography>
        <UploadAvatar
          avatar={avatar}
          apelido={apelido}
          handleAvatarChange={handleAvatarChange}
        />
        <ProfileForm
          nome={nome}
          setNome={setNome}
          email={email}
          setEmail={setEmail}
          senha={senha}
          setSenha={setSenha}
          apelido={apelido}
          setApelido={setApelido}
          profissao={profissao}
          setProfissao={setProfissao}
          handleUpdateProfile={handleUpdateProfile}
        />
      </div>
    </div>
  );
};

export default EditProfilePage;
