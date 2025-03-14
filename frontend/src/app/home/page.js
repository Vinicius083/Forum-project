"use client";

import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Navbar from "@/components/Navbar";
import Timeline from "@/components/post/Timeline";
import PostsMaisCurtidos from "@/components/post/PostsMaisCurtidos";
import { buscarPosts } from "@/services/postServices";
import "@/styles/style.css";

export default function Home() {
  const [usuario, setUsuario] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsuario = JSON.parse(localStorage.getItem("user"));
      setUsuario(storedUsuario.usuario);
    }

    const fetchPosts = async () => {
      try {
        const data = await buscarPosts();
        setPosts(data);
      } catch (error) {
        console.error("Erro ao buscar posts", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="general">
      <Navbar
        avatar={usuario?.avatar}
        apelido={usuario?.apelido}
        nome={usuario?.nome}
      />
      <div className="content">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <PostsMaisCurtidos />
          </Grid>
          <Grid item xs={12} md={8}>
            <Timeline posts={posts} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
