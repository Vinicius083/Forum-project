# 📢 Dialoga - Plataforma de Discussão e Conexão

O **Dialoga** é uma plataforma moderna e interativa desenvolvida para **conectar pessoas** e **promover discussões** sobre diversos temas. Com uma interface amigável e funcionalidades robustas, o projeto facilita a troca de ideias e o engajamento entre os usuários, oferecendo uma experiência fluida e intuitiva.

---

## 🚀 Funcionalidades

### 🔐 Cadastro e Login

- Autenticação segura com **JWT (JSON Web Token)**
- Cadastro com: nome, apelido, profissão e avatar

### 📰 Timeline de Posts

- Exibição dos posts em ordem cronológica
- Destaque para os mais curtidos

### 👍 Sistema de Curtidas

- Curtidas em **posts e comentários**
- Atualização dinâmica da contagem

### 💬 Comentários

- Discussões detalhadas nos posts
- Curtidas também nos comentários

### 👤 Perfil do Usuário

- Página com dados do usuário
- Estatísticas de engajamento (posts e comentários)

### ✏️ Edição de Perfil

- Atualização de informações e avatar

### 📝 Criação e Edição de Posts

- Posts novos ou edição dos existentes

### 📚 Documentação da API

- **Swagger** interativo para facilitar o uso da API

---

## 🧪 Tecnologias Utilizadas

### Frontend

- **Next.js**
- **Material-UI**
- **CSS customizado**

### Backend

- **Express.js**
- **MySQL**
- **Sequelize (ORM)**
- **JWT para autenticação**
- **Swagger para documentação**

---

## 🛠️ Como Rodar o Projeto

### ✅ Pré-requisitos

- Node.js **20+**
- MySQL instalado e configurado
- npm ou yarn

---

### 🔧 Backend

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/dialoga.git
cd dialoga/backend

# Instale as dependências
npm install

# Configure o banco de dados
# Edite o arquivo config/config.json com suas credenciais MySQL

# Rode as migrations
npx sequelize db:migrate

# (Opcional) Rode os seeds
npx sequelize db:seed:all

# Inicie o servidor
npm run dev
```

### 💻 Frontend

```bash
# Vá para a pasta do frontend
cd ../frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev

# Acesse: http://localhost:3000

```

## ✅ Conclusão

O Dialoga é mais do que uma plataforma de discussão — é um ambiente de aprendizado, troca de ideias e conexões reais. Se você quer colaborar com o projeto, aprender mais ou contribuir com melhorias, sinta-se à vontade para explorar o repositório ou entrar em contato.

Vamos juntos construir uma comunidade de troca e aprendizado! 🚀

## 📎 Contato

- LinkedIn: [Vinícius Almeida](https://www.linkedin.com/in/viniciusalmeidabe/)

## Licença: ISC

Desenvolvido por Vinícius Almeida
