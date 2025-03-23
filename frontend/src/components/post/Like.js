"use client";

import React, { useState, useEffect, use } from "react";
import { IconButton } from "@mui/material";
import { Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { curtirPost, verificaLikePost } from "@/services/postServices";

export default function BotaoLike({ post_id, usuario_id, qtdCurtidas, tipo }) {
  const [postCurtido, setPostCurtido] = useState(false);
  const [qtdLikes, setQtdLikes] = useState(qtdCurtidas);

  useEffect(() => {
    const verificarCurtida = async () => {
      if (!usuario_id) return;
      try {
        const resposta = await verificaLikePost(post_id, usuario_id, tipo);
        setPostCurtido(resposta.message === "Like");
      } catch (error) {
        console.error("Erro ao verificar curtida:", error);
      }
    };

    verificarCurtida();
  }, [post_id, usuario_id, tipo]);

  const Curtir = async () => {
    if (postCurtido) {
      setQtdLikes(qtdLikes - 1);
    } else {
      setQtdLikes(qtdLikes + 1);
    }
    try {
      const response = await curtirPost(post_id, usuario_id, tipo);
      if (response) {
        setPostCurtido((prev) => !prev);
      }
    } catch (error) {
      console.error("Erro ao curtir post:", error);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <IconButton onClick={Curtir} color="primary">
        {postCurtido ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
      </IconButton>
      <Typography variant="body2" mr={1}>
        {qtdLikes}
      </Typography>
    </div>
  );
}
