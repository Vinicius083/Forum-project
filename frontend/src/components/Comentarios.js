import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import BotaoLike from "@/components/post/Like";
import DeleteButton from "./post/DeleteButton";

const Comentarios = ({ comentarios }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsuario = JSON.parse(localStorage.getItem("user"));
      setUsuario(storedUsuario?.usuario);
    }
  }, []);

  if (!comentarios.length) return null;

  return (
    <Box
      my={4}
      sx={{
        width: "800px",
        borderRadius: "32px",
        padding: "25px",
        backgroundColor: "#2F2F34",
        color: "#fff",
      }}
    >
      {comentarios.map((comentario) => (
        <Box
          key={comentario.id}
          mb={2}
          sx={{ borderBottom: "1px solid #444", pb: 2 }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center">
              <Avatar
                src={comentario.usuario?.avatar}
                alt={comentario.usuario?.apelido}
              />
              <Typography variant="body1" ml={2}>
                @{comentario.usuario?.apelido}
              </Typography>
            </Box>

            {usuario?.id === comentario.usuario_id && (
              <DeleteButton
                post_id={comentario?.post_id}
                comentario_id={comentario?.id}
              />
            )}
          </Box>

          <Typography variant="body2" mt={1}>
            {comentario.conteudo}
          </Typography>

          <Box display="flex" alignItems="center" mt={1}>
            <BotaoLike
              post_id={comentario.post_id}
              usuario_id={usuario?.id}
              comentario_id={comentario.id}
              tipo="comentário"
            />
            <Typography variant="body2" ml={1}>
              {comentario.qtd_curtidas}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Comentarios;
