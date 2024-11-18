import {
  Sequelize
} from "sequelize";

export default new Sequelize({
  dialect: "postgres",
  host: "postgres",
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  // logging: false,
  // models: [Dog],
})
