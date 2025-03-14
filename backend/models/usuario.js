import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Usuario = sequelize.define(
    "Usuario",
    {
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      senha: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apelido: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profissao: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      avatar: {
        type: DataTypes.BLOB("long"),
        allowNull: true,
      },
    },
    {
      tableName: "usuarios",
    }
  );

  Usuario.associate = (models) => {
    Usuario.hasMany(models.Post, {
      foreignKey: "usuario_id",
    });
  };

  return Usuario;
};
