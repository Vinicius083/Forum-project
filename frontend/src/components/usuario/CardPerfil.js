import React from "react";
import { Box, Typography, Avatar, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import "boxicons";

const CardPerfil = ({ usuario }) => {
  const router = useRouter();

  return (
    <Box
      sx={{
        width: "1050px",
        borderRadius: "16px",
        padding: "40px",
        backgroundColor: "#181818",
        color: "#fff",
        textAlign: "center",
        position: "relative",
        mt: 9,
      }}
    >
      <Avatar
        src={usuario.avatar}
        alt={usuario.apelido}
        sx={{
          width: 150,
          height: 150,
          position: "absolute",
          top: "-60px",
          left: "50%",
          transform: "translateX(-50%)",
          border: "10px solid #181818",
        }}
      />
      <Button
        variant="contained"
        sx={{
          ml: 100,
          backgroundColor: "#6c63ff",
          "&:hover": { backgroundColor: "#5548c8" },
        }}
        onClick={() => router.push(`/profile/edit/${usuario.id}`)}
      >
        Editar Perfil
      </Button>
      <Typography variant="h4" mt={3}>
        <strong>{usuario.nome}</strong>
      </Typography>
      <Typography variant="h5">{usuario.profissao}</Typography>
      <Box
        sx={{
          marginTop: "24px",
          display: "flex",
          justifyContent: "center",
          gap: "5px",
        }}
      >
        <box-icon name="cake" type="solid" color="gray"></box-icon>
        <Typography variant="body2" color="gray" sx={{ marginTop: "3px" }}>
          Entrou em {new Date(usuario.createdAt).toLocaleDateString()}
        </Typography>
      </Box>
    </Box>
  );
};

export default CardPerfil;
