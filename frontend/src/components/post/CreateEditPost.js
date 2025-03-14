import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import {
  criarPost,
  atualizarPost,
  buscarPostPorId,
} from "@/services/postServices";
import { Save, Edit } from "@mui/icons-material";
import "@/styles/style.css";

const CreateEditPost = ({ post_id, usuario_id }) => {
  const router = useRouter();
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsuario = JSON.parse(localStorage.getItem("user"));
      setUsuario(storedUsuario?.usuario);
    }
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      if (post_id) {
        try {
          const post = await buscarPostPorId(post_id);
          if (post.usuario_id !== usuario_id) {
            router.push("/home");
          } else {
            setTitulo(post.titulo);
            setConteudo(post.conteudo);
          }
        } catch (error) {
          console.error("Erro ao buscar post:", error);
        }
      }
    };

    fetchPost();
  }, [post_id, usuario_id]);

  const handleSubmit = async () => {
    try {
      if (post_id) {
        await atualizarPost(post_id, { titulo, conteudo });
      } else {
        await criarPost(usuario.id, titulo, conteudo);
      }
      router.push("/home");
    } catch (error) {
      console.error("Erro ao salvar post:", error);
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{ bgcolor: "#1a1a1a", color: "#fff", p: 4, borderRadius: 2, mt: 4 }}
    >
      <Box>
        <Typography variant="h5" component="h1" fontWeight={700} sx={{ mb: 2 }}>
          {post_id ? "Editar Post" : "Criar Novo Post"}
        </Typography>
        <TextField
          fullWidth
          variant="filled"
          label="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          sx={{
            mb: 2,
            bgcolor: "#2a2a2a",
            borderRadius: 1,
            input: { color: "#ffffff" },
          }}
          InputLabelProps={{ style: { color: "#aaa" } }}
        />
        <TextField
          fullWidth
          variant="filled"
          label="Escreva seu post..."
          multiline
          rows={6}
          value={conteudo}
          onChange={(e) => setConteudo(e.target.value)}
          sx={{
            mb: 3,
            bgcolor: "#2a2a2a",
            borderRadius: 1,
            "& .MuiInputBase-input": { color: "#fff" },
          }}
          InputLabelProps={{ style: { color: "#aaa" } }}
        />

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            startIcon={post_id ? <Edit /> : <Save />}
            sx={{ textTransform: "none", fontWeight: "bold" }}
          >
            {post_id ? "Atualizar" : "Publicar"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateEditPost;
