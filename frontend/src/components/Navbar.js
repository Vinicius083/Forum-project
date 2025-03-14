import React from 'react';
import { AppBar, Toolbar, Typography, Avatar, Box, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const Navbar = ({ avatar, apelido, nome }) => {
  const router = useRouter();
  return (
    <AppBar position="static">
      <Toolbar sx={{ backgroundColor: "#232328" }}>
        <Typography variant="h6" sx={{ flexGrow: 2 }} onClick={() => {router.push("/home")}}>
          Forum Project
        </Typography>
        <Box display="flex" alignItems="center">
          <Button variant="contained" color="primary" onClick={() => {router.push("/post/create")}} sx={{ marginRight: 2 }}>
            Criar Post
          </Button>
          <Avatar src={avatar} alt={apelido} sx={{ marginRight: 1 }} onClick={() => {router.push("/profile")}} />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="body1" sx={{ marginRight: 1 }} onClick={() => {router.push("/profile")}}>
              Olá, <strong>{nome}</strong>
            </Typography>
            <Typography variant="body1" onClick={() => {router.push("/profile")}}>{`@${apelido}`}</Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;