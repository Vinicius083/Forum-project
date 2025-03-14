import React from 'react';
import { Box, TextField, Button } from '@mui/material';

const ProfileForm = ({ nome, setNome, email, setEmail, senha, setSenha, apelido, setApelido, profissao, setProfissao, handleUpdateProfile }) => {
  return (
    <Box>
      <TextField
        fullWidth
        label="Nome"
        variant="outlined"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        sx={{ mb: 2, '& .MuiOutlinedInput-root': {
            color: '#fff',
            '& fieldset': {
              borderColor: '#fff',
            },
            '&:hover fieldset': {
              borderColor: '#fff',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#fff',
            },
          },
          '& .MuiInputBase-input': {
            color: '#fff',
          },
          '& .MuiInputLabel-root': {
            color: '#fff',
          }, }}
      />
      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mb: 2, '& .MuiOutlinedInput-root': {
            color: '#fff',
            '& fieldset': {
              borderColor: '#fff',
            },
            '&:hover fieldset': {
              borderColor: '#fff',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#fff',
            },
          },
          '& .MuiInputBase-input': {
            color: '#fff',
          },
          '& .MuiInputLabel-root': {
            color: '#fff',
          }, }}
      />
      <TextField
        fullWidth
        label="Senha"
        type="password"
        variant="outlined"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        sx={{ mb: 2, '& .MuiOutlinedInput-root': {
            color: '#fff',
            '& fieldset': {
              borderColor: '#fff',
            },
            '&:hover fieldset': {
              borderColor: '#fff',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#fff',
            },
          },
          '& .MuiInputBase-input': {
            color: '#fff',
          },
          '& .MuiInputLabel-root': {
            color: '#fff',
          }, }}
      />
      <TextField
        fullWidth
        label="Apelido"
        variant="outlined"
        value={apelido}
        onChange={(e) => setApelido(e.target.value)}
        sx={{ mb: 2, '& .MuiOutlinedInput-root': {
            color: '#fff',
            '& fieldset': {
              borderColor: '#fff',
            },
            '&:hover fieldset': {
              borderColor: '#fff',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#fff',
            },
          },
          '& .MuiInputBase-input': {
            color: '#fff',
          },
          '& .MuiInputLabel-root': {
            color: '#fff',
          }, }}
      />
      <TextField
        fullWidth
        label="Profissão"
        variant="outlined"
        value={profissao}
        onChange={(e) => setProfissao(e.target.value)}
        sx={{ mb: 2, '& .MuiOutlinedInput-root': {
            color: '#fff',
            '& fieldset': {
              borderColor: '#fff',
            },
            '&:hover fieldset': {
              borderColor: '#fff',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#fff',
            },
          },
          '& .MuiInputBase-input': {
            color: '#fff',
          },
          '& .MuiInputLabel-root': {
            color: '#fff',
          }, }}
      />
      <Button variant="contained" color="primary" onClick={handleUpdateProfile}>
        Atualizar Perfil
      </Button>
    </Box>
  );
};

export default ProfileForm;