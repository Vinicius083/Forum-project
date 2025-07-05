"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Usuarios", [
      {
        nome: "Alice Santos",
        email: "alice.santos@example.com",
        senha: "senha123",
        apelido: "alice_s",
        profissao: "Engenheira de Software",
        avatar: "https://example.com/avatar/alice.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: "Bruno Costa",
        email: "bruno.costa@example.com",
        senha: "senha123",
        apelido: "bruno_c",
        profissao: "Analista de Dados",
        avatar: "https://example.com/avatar/bruno.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: "Carla Oliveira",
        email: "carla.oliveira@example.com",
        senha: "senha123",
        apelido: "carla_o",
        profissao: "Designer Gráfico",
        avatar: "https://example.com/avatar/carla.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: "Daniel Pereira",
        email: "daniel.pereira@example.com",
        senha: "senha123",
        apelido: "daniel_p",
        profissao: "Desenvolvedor Full Stack",
        avatar: "https://example.com/avatar/daniel.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: "Eduarda Lima",
        email: "eduarda.lima@example.com",
        senha: "senha123",
        apelido: "eduarda_l",
        profissao: "Especialista em Marketing Digital",
        avatar: "https://example.com/avatar/eduarda.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: "Fernando Almeida",
        email: "fernando.almeida@example.com",
        senha: "senha123",
        apelido: "fernando_a",
        profissao: "Administrador de Sistemas",
        avatar: "https://example.com/avatar/fernando.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const usuarios = await queryInterface.sequelize.query(
      `SELECT id FROM Usuarios;`
    );

    const usuarioIds = usuarios[0];

    await queryInterface.bulkInsert("Posts", [
      {
        titulo: "Como aprender JavaScript",
        conteudo:
          "JavaScript é uma linguagem poderosa para desenvolvimento web. Aqui estão algumas dicas para começar.",
        usuario_id: usuarioIds[0].id,
        dh_criacao: new Date(),
        qtd_curtidas: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        titulo: "Análise de dados com Python",
        conteudo:
          "Python é uma linguagem versátil para análise de dados. Descubra como utilizá-la em seus projetos.",
        usuario_id: usuarioIds[1].id,
        dh_criacao: new Date(),
        qtd_curtidas: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        titulo: "Design para iniciantes",
        conteudo:
          "Se você está começando no mundo do design, aqui estão algumas dicas para criar projetos incríveis.",
        usuario_id: usuarioIds[2].id,
        dh_criacao: new Date(),
        qtd_curtidas: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        titulo: "Desenvolvimento Full Stack",
        conteudo:
          "Entenda como se tornar um desenvolvedor full stack e dominar tanto o front-end quanto o back-end.",
        usuario_id: usuarioIds[3].id,
        dh_criacao: new Date(),
        qtd_curtidas: 25,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        titulo: "Marketing Digital para Negócios",
        conteudo:
          "Aprenda como o marketing digital pode impulsionar o crescimento do seu negócio.",
        usuario_id: usuarioIds[4].id,
        dh_criacao: new Date(),
        qtd_curtidas: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        titulo: "Segurança em Sistemas",
        conteudo:
          "Descubra as melhores práticas para garantir a segurança dos sistemas e proteger dados sensíveis.",
        usuario_id: usuarioIds[5].id,
        dh_criacao: new Date(),
        qtd_curtidas: 18,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        titulo: "Introdução ao React",
        conteudo:
          "React é uma biblioteca poderosa para criar interfaces de usuário. Saiba como começar a utilizá-la.",
        usuario_id: usuarioIds[0].id,
        dh_criacao: new Date(),
        qtd_curtidas: 22,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        titulo: "Python para Ciência de Dados",
        conteudo:
          "Explore como Python pode ser usado para manipulação e análise de grandes volumes de dados.",
        usuario_id: usuarioIds[1].id,
        dh_criacao: new Date(),
        qtd_curtidas: 35,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        titulo: "Ferramentas de Design Gráfico",
        conteudo:
          "Conheça as principais ferramentas para criar designs profissionais e criativos.",
        usuario_id: usuarioIds[2].id,
        dh_criacao: new Date(),
        qtd_curtidas: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        titulo: "Node.js para Iniciantes",
        conteudo:
          "Aprenda como usar Node.js para criar aplicações escaláveis e de alta performance.",
        usuario_id: usuarioIds[3].id,
        dh_criacao: new Date(),
        qtd_curtidas: 28,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        titulo: "Estratégias de SEO",
        conteudo:
          "Descubra como otimizar seu site para melhorar o ranqueamento nos motores de busca.",
        usuario_id: usuarioIds[4].id,
        dh_criacao: new Date(),
        qtd_curtidas: 40,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        titulo: "Automação de Tarefas com Scripts",
        conteudo:
          "Saiba como criar scripts para automatizar tarefas repetitivas e aumentar sua produtividade.",
        usuario_id: usuarioIds[5].id,
        dh_criacao: new Date(),
        qtd_curtidas: 16,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        titulo: "Melhores Práticas de Programação",
        conteudo:
          "Aprenda as melhores práticas para escrever código limpo, eficiente e fácil de manter.",
        usuario_id: usuarioIds[0].id,
        dh_criacao: new Date(),
        qtd_curtidas: 24,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Posts", null, {});

    await queryInterface.bulkDelete("Usuarios", null, {});
  },
};
