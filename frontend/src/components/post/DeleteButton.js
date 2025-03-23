import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { deletarPost } from "@/services/postServices";
import { deletarComentario } from "@/services/comentarioServices";
import "boxicons";

const DeleteButton = ({
  post_id,
  comentario_id,
  comentarios,
  setComentarios,
}) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  console.log(post_id, comentario_id);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      if (post_id && !comentario_id) {
        await deletarPost(post_id);
        router.push("/home");
      } else {
        await deletarComentario(post_id, comentario_id);
        setComentarios((prevComentarios) =>
          prevComentarios.filter(
            (comentario) => comentario.id !== comentario_id
          )
        );
      }
      handleClose();
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };

  return (
    <>
      <IconButton>
        <box-icon
          name="trash-alt"
          type="solid"
          color="#dfd2d2"
          onClick={handleClickOpen}
        ></box-icon>
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmar Ação</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja deletar este{" "}
            {comentario_id ? "comentário" : "post"}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteButton;
