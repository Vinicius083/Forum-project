import request from 'supertest';
import app from '../server.js';

describe('Testes das rotas de usuário', () => {
  let token;

  beforeAll(async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'teste@example.com', senha: 'senha123' });
    token = response.body.token;
  });

  afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500)); // Espera para garantir que o servidor seja fechado corretamente
    app.close(); // Fecha o servidor após os testes
  });

  it('Deve criar um novo usuário', async () => {
    const response = await request(app)
      .post('/usuarios')
      .send({ nome: 'Novo Usuário', email: 'novo@example.com', senha: 'senha123', apelido: 'novo', profissao: 'Desenvolvedor' });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('Deve obter um usuário pelo ID', async () => {
    const response = await request(app)
      .get('/usuarios/1')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('Deve atualizar um usuário pelo ID', async () => {
    const response = await request(app)
      .put('/usuarios/1')
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: 'Usuário Atualizado' });

    expect(response.statusCode).toBe(200);
    expect(response.body.nome).toBe('Usuário Atualizado');
  });

  it('Deve deletar um usuário pelo ID', async () => {
    const response = await request(app)
      .delete('/usuarios/1')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });
});