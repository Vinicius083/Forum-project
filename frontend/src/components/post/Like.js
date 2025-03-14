"use client";

import React, { useState, useEffect, use } from "react";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { curtirPost, verificaLikePost } from "@/services/postServices";
import { curtirComentario } from "@/services/comentarioServices";

export default function BotaoLike({
  post_id,
  usuario_id,
  comentario_id,
  tipo,
}) {
  const [postCurtido, setPostCurtido] = useState(false);
  const [comentarioCurtido, setComentarioCurtido] = useState(false);

  useEffect(() => {
    const verificarCurtida = async () => {
      if (!usuario_id) return;
      try {
        const resposta = await verificaLikePost(post_id, usuario_id, tipo);
        console.log(resposta.message);
        setPostCurtido(resposta.message === "Like");
      } catch (error) {
        console.error("Erro ao verificar curtida:", error);
      }
    };

    verificarCurtida();
  }, [post_id, usuario_id, tipo]);

  console.log(post_id,
    usuario_id,
    comentario_id,
    tipo,)

  const Curtir = async () => {
    if (tipo === "post") {
      try {
        const response = await curtirPost(post_id, usuario_id, tipo);
        if (response) {
          setPostCurtido((prev) => !prev);
        }
      } catch (error) {
        console.error("Erro ao curtir post:", error);
      }
    } else {
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
    }
  };

  return (
    <IconButton onClick={Curtir} color="primary">
      {postCurtido || comentarioCurtido ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
    </IconButton>
  );
}
