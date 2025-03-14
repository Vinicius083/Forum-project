import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Post = sequelize.define(
    "Post",
    {
      titulo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      conteudo: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      dh_criacao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      qtd_curtidas: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "usuarios",
          key: "id",
        },
        allowNull: false,
      },
    },
    {
      tableName: "posts",
    }
  );

  Post.associate = (models) => {
    Post.belongsTo(models.Usuario, {
      foreignKey: "usuario_id",
      as: "usuario",
    });
  };

  return Post;
};
