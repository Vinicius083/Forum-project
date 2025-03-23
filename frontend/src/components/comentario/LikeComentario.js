"use client";

import React, { useState, useEffect, use } from "react";
import { IconButton } from "@mui/material";
import { Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  curtirComentario,
  verificaLikeComentario,
} from "@/services/comentarioServices";

export default function BotaoLikeComentario({
  post_id,
  usuario_id,
  comentario_id,
  qtdCurtidas,
  tipo,
}) {
  const [comentarioCurtido, setComentarioCurtido] = useState(false);
  const [qtdLikes, setQtdLikes] = useState(qtdCurtidas);

  useEffect(() => {
    const verificarCurtida = async () => {
      if (!usuario_id) return;
      try {
        const resposta = await verificaLikeComentario(
          post_id,
          comentario_id,
          tipo,
          usuario_id
        );
        setComentarioCurtido(resposta.message === "Like");
      } catch (error) {
        console.error("Erro ao verificar curtida:", error);
      }
    };

    verificarCurtida();
  }, [post_id, usuario_id, comentario_id, tipo]);

  const Curtir = async () => {
    if (comentarioCurtido) {
      setQtdLikes(qtdLikes - 1);
    } else {
      setQtdLikes(qtdLikes + 1);
    }
    try {
      const response = await curtirComentario(
        post_id,
        usuario_id,
        comentario_id,
        tipo
      );
      if (response) {
        setComentarioCurtido((prev) => !prev);
      }
    } catch (error) {
      console.error("Erro ao curtir comentário:", error);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <IconButton onClick={Curtir} color="primary">
        {comentarioCurtido ? (
          <FavoriteIcon color="error" />
        ) : (
          <FavoriteBorderIcon />
        )}
        <Typography variant="body2" mr={1}>
          {qtdLikes}
        </Typography>
      </IconButton>
    </div>
  );
}
