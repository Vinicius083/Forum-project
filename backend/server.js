import express from "express";
import cors from "cors";
import sequelize from "./config/dbConfig.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import comentarioRoutes from "./routes/comentarioRoutes.js";
import { expressjwt } from "express-jwt";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

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
app.use("/usuarios", usuarioRoutes);
app.use("/posts", postRoutes);
app.use("/posts", comentarioRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(
  expressjwt({
    secret: "chave-secreta",
    algorithms: ["HS256"],
  }).unless({
    path: [
      { url: /^\/api-docs\/?\./, methods: ["GET"] },
      { url: "/usuarios/login", methods: ["POST"] },
      { url: "/usuarios", methods: ["POST"] },
    ],
  })
);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

export default app;
