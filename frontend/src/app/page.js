"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Typography } from "@mui/material";
import "@/styles/style.css";

export default function Home() {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  const handleRegisterRedirect = () => {
    router.push("/register");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#232328",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          color: "#fff",
          fontWeight: "bold",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Bem-vindo ao Dialoga
      </Typography>
      <Typography
        variant="h6"
        sx={{
          color: "#aaa",
          marginBottom: "40px",
          textAlign: "center",
        }}
      >
        Conecte-se com pessoas e compartilhe suas ideias!
      </Typography>
      <Box display="flex" gap={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLoginRedirect}
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
        >
          Login
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleRegisterRedirect}
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            padding: "10px 20px",
            borderColor: "#fff",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#fff",
              color: "#232328",
            },
          }}
        >
          Cadastre-se
        </Button>
      </Box>
    </div>
  );
}
