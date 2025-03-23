import express from "express";
import cors from "cors";
import sequelize from "./config/dbConfig.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import comentarioRoutes from "./routes/comentarioRoutes.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import authMiddleware from "./middleware/auth.js";

const app = express();
const port = 3001;
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Forum API",
      version: "1.0.0",
      description: "API de um fórum",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: {
      bearerAuth: [],
    },
  },
  apis: ["./routes/*.js"],
};
const specs = swaggerJsdoc(options);

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados realizada com sucesso!");
  })
  .catch((err) => console.log("Erro ao conectar com o banco de dados!", err));

sequelize.sync().then(() => {
  console.log("Database & tables synchronized!");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authMiddleware);
app.use("/usuarios", usuarioRoutes);
app.use("/posts", postRoutes);
app.use("/posts", comentarioRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => {
  console.log(`Documentação rodando em http://localhost:${port}/api-docs`);
});


export default app;
