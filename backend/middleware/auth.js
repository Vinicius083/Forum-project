import { expressjwt } from "express-jwt";

const jwtSecret = "jeff_e_massa";

const authMiddleware = expressjwt({
  secret: jwtSecret,
  algorithms: ["HS256"],
}).unless({
  path: [
    { url: /^\/api-docs\/?.*/, methods: ["GET"] },
    { url: "/usuarios/login", methods: ["POST"] },
    { url: "/usuarios", methods: ["POST"] },
  ],
});

export default authMiddleware;