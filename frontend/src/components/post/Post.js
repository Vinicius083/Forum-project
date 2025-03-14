import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
  CardActionArea,
} from "@mui/material";
import { useRouter } from "next/navigation";
import "boxicons";

const Post = ({ post }) => {
  const router = useRouter();
  const maxContentLength = 70;

  return (
    <Card
      sx={{
        marginBottom: 2,
        borderRadius: "32px",
        backgroundColor: "#2F2F34",
        color: "#fff",
        width: "600px",
        height: "250px",
      }}
    >
      <CardActionArea
        onClick={() => {
          router.replace(`/post/${post.id}`);
        }}
      >
        <CardHeader
          avatar={
            <Avatar src={post.usuario?.avatar} alt={post.usuario?.apelido} />
          }
          title={`@${post.usuario?.apelido}`}
          subheader={new Date(post.dh_criacao).toLocaleString()}
          subheaderTypographyProps={{ style: { color: "#fff" } }}
        />
        <CardContent>
          <Typography variant="h6">{post.titulo}</Typography>
          <Typography variant="body1">
            {post.conteudo.length > maxContentLength
              ? `${post.conteudo.substring(0, maxContentLength)}...`
              : post.conteudo}
          </Typography>
        </CardContent>
        <CardContent
          sx={{
            marginTop: "34px",
            display: "flex",
            justifyContent: "start",
            gap: "3px",
          }}
        >
          <box-icon name="heart" color="#faf5f5"></box-icon>{" "}
          <Typography variant="p" sx={{ marginTop: "3px" }}>
            {post.qtd_curtidas}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Post;
