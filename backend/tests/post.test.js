import request from "supertest";
import app from "../server.js";

describe("Testes das rotas de post", () => {
  let token;
  let postId;

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

  test("Deve criar um novo post", async () => {
    const response = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        usuarioId: 1,
        titulo: "Meu primeiro post",
        conteudo: "Este é o conteúdo do meu primeiro post.",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    postId = response.body.id;
  });

  test("Deve obter a timeline de posts", async () => {
    const response = await request(app)
      .get("/posts/timeline")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test("Deve obter um post pelo ID", async () => {
    const response = await request(app)
      .get(`/posts/${postId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id");
  });

  test("Deve atualizar um post pelo ID", async () => {
    const response = await request(app)
      .put(`/posts/${postId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        titulo: "Título atualizado",
        conteudo: "Conteúdo atualizado",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.titulo).toBe("Título atualizado");
  });

  test("Deve incrementar likes de um post pelo ID", async () => {
    const response = await request(app)
      .post(`/posts/${postId}/like`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        usuario_id: 1,
        tipo: "like",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Quantidade de likes atualizado");
  });

  test("Deve deletar um post pelo ID", async () => {
    const response = await request(app)
      .delete(`/posts/${postId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });
});import request from "supertest";
import app from "../server.js";

describe("Testes das rotas de post", () => {
  let token;
  let postId;

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

  test("Deve criar um novo post", async () => {
    const response = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        usuarioId: 1,
        titulo: "Meu primeiro post",
        conteudo: "Este é o conteúdo do meu primeiro post.",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    postId = response.body.id;
  });

  test("Deve obter a timeline de posts", async () => {
    const response = await request(app)
      .get("/posts/timeline")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test("Deve obter um post pelo ID", async () => {
    const response = await request(app)
      .get(`/posts/${postId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id");
  });

  test("Deve atualizar um post pelo ID", async () => {
    const response = await request(app)
      .put(`/posts/${postId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        titulo: "Título atualizado",
        conteudo: "Conteúdo atualizado",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.titulo).toBe("Título atualizado");
  });

  test("Deve incrementar likes de um post pelo ID", async () => {
    const response = await request(app)
      .post(`/posts/${postId}/like`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        usuario_id: 1,
        tipo: "like",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Quantidade de likes atualizado");
  });

  test("Deve deletar um post pelo ID", async () => {
    const response = await request(app)
      .delete(`/posts/${postId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });
});