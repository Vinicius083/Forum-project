"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import CreateEditPost from '@/components/post/CreateEditPost';

const EditPostPage = () => {
  const { id } = useParams()
  const usuarioId = JSON.parse(localStorage.getItem("user")).usuario.id;

  return <CreateEditPost post_id={id} usuario_id={usuarioId} />;
};

export default EditPostPage;