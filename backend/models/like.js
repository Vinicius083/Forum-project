import { DataTypes } from "sequelize";

const Like = (sequelize) => {
  const Like = sequelize.define(
    "Like",
    {
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
      tipo: {
        type: DataTypes.ENUM("post", "comentário"),
        allowNull: false,
      },
    },
    {
      tableName: "likes",
    }
  );

  Like.associate = (models) => {
    Like.belongsTo(models.Post, {
      foreignKey: "post_id",
      as: "post",
    });

    Like.belongsTo(models.Usuario, {
      foreignKey: "usuario_id",
      as: "usuario",
    });
  };

  return Like;
};

export default Like;
