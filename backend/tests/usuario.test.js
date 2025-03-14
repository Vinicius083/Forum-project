import request from "supertest";
import app from "../server.js";

describe("Testes das rotas de usuário", () => {
  let token;

  beforeAll(async () => {
    // Cria um usuário para autenticação
    await request(app)
      .post("/usuarios")
      .send({
        nome: "Teste",
        email: "teste@example.com",
        senha: "Senha@123",
        apelido: "teste",
        profissao: "Desenvolvedor",
      });

    // Faz login para obter o token JWT
    const response = await request(app)
      .post("/usuarios/login")
      .send({
        email: "teste@example.com",
        senha: "Senha@123",
      });

    token = response.body.token;
  });

  afterAll(async () => {
    // Deleta o usuário de teste
    await request(app)
      .delete("/usuarios/1")
      .set("Authorization", `Bearer ${token}`);
  });

  test("Deve criar um novo usuário", async () => {
    const response = await request(app)
      .post("/usuarios")
      .send({
        nome: "Novo Usuário",
        email: "novo@example.com",
        senha: "Senha@123",
        apelido: "novo",
        profissao: "Desenvolvedor",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  test("Deve obter um usuário pelo ID", async () => {
    const response = await request(app)
      .get("/usuarios/1")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id");
  });

  test("Deve atualizar um usuário pelo ID", async () => {
    const response = await request(app)
      .put("/usuarios/1")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Usuário Atualizado",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.nome).toBe("Usuário Atualizado");
  });

  test("Deve deletar um usuário pelo ID", async () => {
    const response = await request(app)
      .delete("/usuarios/1")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });
});