import {
  Sequelize
} from "sequelize";

// const sequelize = new Sequelize(
//   `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@postgres:5432/${process.env.POSTGRES_DB}`
// ); 


export default new Sequelize({
  dialect: "postgres",
  host: "postgres",
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  // logging: false,
  // models: [Dog],
})
