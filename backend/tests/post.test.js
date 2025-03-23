import request from 'supertest';
import app from '../server.js';

describe('Testes das rotas de post', () => {
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

  it('Deve criar um novo post', async () => {
    const response = await request(app)
      .post('/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({ titulo: 'Novo Post', conteudo: 'Conteúdo do novo post' });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('Deve obter um post pelo ID', async () => {
    const response = await request(app)
      .get('/posts/1')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('Deve atualizar um post pelo ID', async () => {
    const response = await request(app)
      .put('/posts/1')
      .set('Authorization', `Bearer ${token}`)
      .send({ titulo: 'Post Atualizado', conteudo: 'Conteúdo atualizado' });

    expect(response.statusCode).toBe(200);
    expect(response.body.titulo).toBe('Post Atualizado');
  });

  it('Deve deletar um post pelo ID', async () => {
    const response = await request(app)
      .delete('/posts/1')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });
});