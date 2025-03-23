import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Comentario = sequelize.define(
    "Comentario",
    {
      conteudo: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      post_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "posts",
          key: "id",
        },
        allowNull: false,
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "usuarios",
          key: "id",
        },
        allowNull: false,
      },
      qtd_curtidas: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      tableName: "comentarios",
    }
  );

  Comentario.associate = (models) => {
    Comentario.belongsTo(models.Post, {
      foreignKey: "post_id",
      as: "post",
    });
    Comentario.belongsTo(models.Usuario, {
      foreignKey: "usuario_id",
      as: "usuario",
    });
    Comentario.hasMany(models.Like, {
      foreignKey: "comentario_id",
      as: "likes",
    });
  };

  return Comentario;
};
