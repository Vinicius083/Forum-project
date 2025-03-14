import axios from "axios";

const API_URL = "http://localhost:3001";

export const logarUsuario = async (email, senha) => {
  try {
    console.log("logando com", email, senha);
    const response = await axios.post(`${API_URL}/usuarios/login`, {
      email,
      senha,
    });
    console.log("response:", response.data);
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
    const response = await axios.get(`${API_URL}/usuarios/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao buscar usuário");
  }
};

export const buscarPostsDoUsuario = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/usuarios/${id}/posts`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Erro ao buscar posts do usuário"
    );
  }
};

export const atualizarAvatarUsuario = async (id, formData) => {
  try {
    const response = await axios.put(
      `${API_URL}/usuarios/${id}/avatar`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
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
    const response = await axios.put(`${API_URL}/usuarios/${id}`, dados);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Erro ao atualizar perfil"
    );
  }
};

export const deletarUsuario = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/usuarios/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao deletar usuário");
  }
};
