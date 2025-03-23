import axios from "axios";

const API_URL = "http://localhost:3001/";

export const getComentarios = async (post_id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}posts/${post_id}/comentarios`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const criarComentario = async (post_id, comentario) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_URL}posts/${post_id}/comentarios`,
      comentario,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const curtirComentario = async (
  post_id,
  usuario_id,
  comentario_id,
  tipo
) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_URL}posts/${post_id}/comentarios/${comentario_id}/like`,
      { usuario_id, tipo },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const verificaLikeComentario = async (
  post_id,
  comentario_id,
  tipo,
  usuario_id
) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${API_URL}posts/${post_id}/comentarios/${comentario_id}/like`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          usuario_id,
          tipo,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deletarComentario = async (post_id, id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `${API_URL}posts/${post_id}/comentarios/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
