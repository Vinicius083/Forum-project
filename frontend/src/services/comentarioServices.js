import axios from "axios";

const API_URL = "http://localhost:3001/";

export const getComentarios = async (post_id) => {
  try {
    const response = await axios.get(`${API_URL}posts/${post_id}/comentarios`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const criarComentario = async (post_id, comentario) => {
  try {
    const response = await axios.post(
      `${API_URL}posts/${post_id}/comentarios`,
      comentario
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const curtirComentario = async (post_id, usuario_id, comentario_id, tipo) => {
  try {
    const response = await axios.post(
      `${API_URL}posts/${post_id}/comentarios/${comentario_id}/like`,
      { usuario_id, tipo }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deletarComentario = async (post_id, id) => {
  try {
    const response = await axios.delete(
      `${API_URL}posts/${post_id}/comentarios/${id}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
