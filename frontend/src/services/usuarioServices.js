import axios from "axios";

const API_URL = "http://localhost:3001";

export const logarUsuario = async (email, senha) => {
  try {
    const response = await axios.post(`${API_URL}/usuarios/login`, {
      email,
      senha,
    });
    const { token, usuario } = response.data;
    localStorage.setItem("token", token);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao realizar login");
  }
};

export const cadastrarUsuario = async (usuario) => {
  try {
    const response = await axios.post(`${API_URL}/usuarios`, usuario);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Erro ao realizar cadastro"
    );
  }
};

export const buscarUsuarioPorId = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/usuarios/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao buscar usuário");
  }
};

export const buscarPostsDoUsuario = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/usuarios/${id}/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Erro ao buscar posts do usuário"
    );
  }
};

export const atualizarAvatarUsuario = async (id, formData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${API_URL}/usuarios/${id}/avatar`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Erro ao atualizar avatar do usuário"
    );
  }
};

export const atualizarUsuario = async (id, dados) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${API_URL}/usuarios/${id}`, dados, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Erro ao atualizar perfil"
    );
  }
};

export const deletarUsuario = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API_URL}/usuarios/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao deletar usuário");
  }
};
