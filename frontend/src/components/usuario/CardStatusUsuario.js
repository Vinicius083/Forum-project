import React from "react";
import { Box, Typography } from "@mui/material";

const CardStatusUsuario = ({ posts, comentarios }) => {
  return (
    <Box
      sx={{
        width: "500px",
        height: "120px",
        borderRadius: "16px",
        padding: "25px",
        backgroundColor: "#181818",
        color: "#fff",
        textAlign: "left",
        mt: 2,
      }}
    >
      <Typography variant="h6">📌 {posts.length} posts publicados</Typography>
      <Typography variant="h6">💬 {comentarios.length} comentários</Typography>
    </Box>
  );
};

export default CardStatusUsuario;
