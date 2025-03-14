import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

const ComentarioForm = ({ postId, usuario, onComentarioSubmit }) => {
  const [novoComentario, setNovoComentario] = useState("");

  const handleComentarioChange = (event) => {
    setNovoComentario(event.target.value);
  };

  const handleComentarioSubmit = async () => {
    if (novoComentario.trim() === "") return;

    try {
      const comentario = {
        usuario_id: usuario.id,
        conteudo: novoComentario,
      };
      await onComentarioSubmit(postId, comentario);
      setNovoComentario("");
    } catch (error) {
      console.error("Erro ao criar comentário:", error);
    }
  };

  return (
    <Box my={4} sx={{ color: "#fff" }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Comentários
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        id="outlined-basic"
        value={novoComentario}
        onChange={handleComentarioChange}
        placeholder="Escreva seu comentário aqui..."
        sx={{
          '& .MuiOutlinedInput-root': {
            color: '#fff',
            '& fieldset': {
              borderColor: '#fff',
            },
            '&:hover fieldset': {
              borderColor: '#fff',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#fff',
            },
          },
          '& .MuiInputBase-input': {
            color: '#fff',
          },
          '& .MuiInputLabel-root': {
            color: '#fff',
          },
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleComentarioSubmit}
        sx={{ mt: 2 }}
      >
        Comentar
      </Button>
    </Box>
  );
};

export default ComentarioForm;
