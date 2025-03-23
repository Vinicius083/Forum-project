"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("likes", "comentario_id", {
      type: Sequelize.INTEGER,
      allowNull: true, // Permite valores nulos inicialmente
      references: {
        model: "comentarios", // Nome da tabela de referência
        key: "id", // Chave primária da tabela de referência
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL", // Define o valor como NULL se o comentário for deletado
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("likes", "comentario_id");
  },
};
