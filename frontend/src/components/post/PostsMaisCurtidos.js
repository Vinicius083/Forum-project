"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  CardActionArea,
} from "@mui/material";
import { buscarPostsMaisCurtidos } from "@/services/postServices";
import { useRouter } from "next/navigation";

const PostsMaisCurtidos = () => {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await buscarPostsMaisCurtidos();
        setPosts(data.slice(0, 5)); // Pega apenas os 5 primeiros posts
      } catch (error) {
        console.error("Erro ao buscar posts mais curtidos:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 2,
        backgroundColor: "#2F2F34",
        borderRadius: "32px",
        width: "331px",
        height: "419px",
      }}
    >
      <Typography variant="h6" sx={{ color: "#A8A8A8", marginTop: 2 }}>
        Posts Mais Curtidos
      </Typography>
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {posts.map((post) => (
          <ListItem
            key={post.id}
            sx={{
              color: "#A8A8A8",
              backgroundColor: "#232328",
              width: "259px",
              height: "51px",
              borderRadius: "10px",
            }}
          >
            {" "}
            <CardActionArea
              onClick={() => {
                router.push(`/post/${post.id}`);
              }}
            >
              <ListItemText primary={post.titulo} />
            </CardActionArea>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default PostsMaisCurtidos;
