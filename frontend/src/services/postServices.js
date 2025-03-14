import axios from "axios";

const API_URL = "http://localhost:3001";

export const buscarPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/posts/timeline`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao buscar posts");
  }
};

export const buscarPostsMaisCurtidos = async () => {
  try {
    const response = await axios.get(`${API_URL}/posts/mais-curtidos`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Erro ao buscar posts mais curtidos"
    );
  }
};

export const buscarPostPorId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao buscar post");
  }
};

export const criarPost = async (usuario_id, titulo, conteudo) => {
  try {
    const response = await axios.post(`${API_URL}/posts`, {
      usuario_id,
      titulo,
      conteudo,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao criar post");
  }
};

export const atualizarPost = async (id, postData) => {
  try {
    const response = await axios.put(`${API_URL}/posts/${id}`, postData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao atualizar post");
  }
};

export const curtirPost = async (id, usuario_id, tipo) => {
  try {
    const response = await axios.post(`${API_URL}/posts/${id}/like`, {
      usuario_id,
      tipo,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao curtir post");
  }
};

export const verificaLikePost = async (id, usuario_id, tipo) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${id}/like`, {
      params: {
        usuario_id,
        tipo,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao verificar like");
  }
};

export const deletarPost = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/posts/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao deletar post");
  }
};
