import axios from "axios";

const API_URL = "http://localhost:3001";

export const buscarPosts = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/posts/timeline`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao buscar posts");
  }
};

export const buscarPostsMaisCurtidos = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/posts/mais-curtidos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Erro ao buscar posts mais curtidos"
    );
  }
};

export const buscarPostPorId = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao buscar post");
  }
};

export const criarPost = async (usuario_id, titulo, conteudo) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_URL}/posts`,
      {
        usuario_id,
        titulo,
        conteudo,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao criar post");
  }
};

export const atualizarPost = async (id, postData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${API_URL}/posts/${id}`, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao atualizar post");
  }
};

export const curtirPost = async (id, usuario_id, tipo) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_URL}/posts/${id}/like`,
      {
        usuario_id,
        tipo,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao curtir post");
  }
};

export const verificaLikePost = async (id, usuario_id, tipo) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/posts/${id}/like`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API_URL}/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao deletar post");
  }
};
