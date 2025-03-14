import React, { use, useEffect, useState } from "react";
import { Box, Typography, Avatar, Button, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import BotaoLike from "@/components/post/Like";
import DeleteButton from "@/components/post/DeleteButton";
import "boxicons";

const PostDetail = ({ post }) => {
  const [usuario, setUsuario] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsuario = JSON.parse(localStorage.getItem("user"));
      setUsuario(storedUsuario?.usuario);
    }
  }, []);

  return (
    <Box
      my={4}
      sx={{
        width: "800px",
        borderRadius: "32px",
        padding: "25px",
        backgroundColor: "#2F2F34",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar src={post.usuario?.avatar} alt={post.usuario?.apelido} />
          <Typography variant="body1" ml={1}>
            @{post.usuario?.apelido}
          </Typography>
          {usuario?.id === post?.usuario_id && (
            <IconButton
              onClick={() => {
                router.push(`/post/edit/${post?.id}`);
              }}
              sx={{ marginLeft: 70 }}
            >
              <box-icon name="pencil" type="solid" color="#dfd2d2"></box-icon>
            </IconButton>
          )}
          {usuario?.id === post.usuario_id && (
            <DeleteButton post_id={post?.id} />
          )}
        </Box>
        <Typography variant="h4" component="h1" gutterBottom>
          {post.titulo}
        </Typography>
        <Typography variant="body1" paragraph>
          {post.conteudo}
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        mt={2}
      >
        <BotaoLike post_id={post.id} usuario_id={usuario?.id} tipo="post" />
        <Typography variant="body2" mr={1}>
          {post.qtd_curtidas}
        </Typography>
        <Typography variant="body1" ml={65}>
          {new Date(post.dh_criacao).toLocaleString()}
        </Typography>
      </Box>
    </Box>
  );
};

export default PostDetail;
