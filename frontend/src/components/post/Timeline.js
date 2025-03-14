"use client";

import React from 'react';
import { Container } from '@mui/material';
import Post from './Post';

const Timeline = ({ posts }) => {
  return (
    <Container sx={{ marginTop: "16px", marginRight: "0px"}}>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </Container>
  );
};

export default Timeline;