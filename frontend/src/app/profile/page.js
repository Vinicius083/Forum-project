"use client";

import React, { useEffect, useState } from "react";
import { buscarPostsDoUsuario } from "@/services/usuarioServices";
import Timeline from "@/components/post/Timeline";
import CardPerfil from "@/components/usuario/CardPerfil";
import CardStatusUsuario from "@/components/usuario/CardStatusUsuario";
import Navbar from "@/components/Navbar";
import "@/styles/style.css"; 

const Profile = () => {
  const [usuario, setUsuario] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsuario = JSON.parse(localStorage.getItem("user"));
      setUsuario(storedUsuario.usuario);
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!usuario?.id) return;
      try {
        const data = await buscarPostsDoUsuario(usuario.id);
        setPosts(data);
      } catch (error) {
        console.error("Erro ao buscar posts do usuário:", error);
      }
    };

    fetchPosts();
  }, [usuario]);

  if (!usuario) return <div>Carregando...</div>;
  return (
    <div className="generalProfile">
      <Navbar
        avatar={usuario?.avatar}
        apelido={usuario?.apelido}
        nome={usuario?.nome}
      />
      <div>
        <CardPerfil usuario={usuario} />
        <div className="mid">
          <CardStatusUsuario posts={posts} comentarios={comentarios} />
          <Timeline posts={posts} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
