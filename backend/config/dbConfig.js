import { Sequelize } from "sequelize";

const sequelize = new Sequelize("ForumData", "root", "12345678", {
  host: "127.0.0.1",
  dialect: "mysql",
});

export default sequelize;
