"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { buscarPostPorId } from "@/services/postServices";
import { getComentarios, criarComentario } from "@/services/comentarioServices";
import PostDetail from "@/components/post/PostDetail";
import ComentarioForm from "@/components/ComentarioForm";
import Comentarios from "@/components/Comentarios";
import Navbar from "@/components/Navbar";
import "@/styles/style.css";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsuario = JSON.parse(localStorage.getItem("user"));
      setUsuario(storedUsuario.usuario);
    }
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        try {
          const data = await buscarPostPorId(id);
          setPost(data);
        } catch (error) {
          console.error("Erro ao buscar post:", error);
        }
      }
    };

    const fetchComentarios = async () => {
      if (id) {
        try {
          const data = await getComentarios(id);
          setComentarios(data);
        } catch (error) {
          console.error("Erro ao buscar comentários:", error);
        }
      }
    };

    fetchPost();
    fetchComentarios();
  }, [id]);

  const handleComentarioSubmit = async (post_id, comentario) => {
    try {
      await criarComentario(post_id, comentario);
      const data = await getComentarios(post_id);
      setComentarios(data);
    } catch (error) {
      console.error("Erro ao criar comentário:", error);
    }
  };

  if (!post) return <div>Carregando...</div>;

  return (
    <div className="generalPost">
      <Navbar
        avatar={usuario?.avatar}
        apelido={usuario?.apelido}
        nome={usuario?.nome}
      />
      <div className="contentPost">
        <PostDetail post={post} />
        <ComentarioForm
          postId={id}
          usuario={usuario}
          onComentarioSubmit={handleComentarioSubmit}
        />
        <Comentarios comentarios={comentarios} setComentarios={setComentarios} />
      </div>
    </div>
  );
};

export default PostPage;
