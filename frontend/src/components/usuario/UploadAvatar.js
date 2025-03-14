import React from 'react';
import { Box, Button, Avatar } from '@mui/material';

const UploadAvatar = ({ avatar, apelido, handleAvatarChange }) => {
  return (
    <Box display="flex" alignItems="center" mb={2}>
      <Avatar src={avatar} alt={apelido} sx={{ width: 100, height: 100 }} />
      <Button variant="contained" component="label" sx={{ ml: 2 }}>
        Alterar Avatar
        <input type="file" hidden onChange={handleAvatarChange} />
      </Button>
    </Box>
  );
};

export default UploadAvatar;