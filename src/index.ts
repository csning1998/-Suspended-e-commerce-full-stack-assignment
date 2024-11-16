import express, { Request, Response, Express } from "express";
import "dotenv/config"; // https://www.npmjs.com/package/dotenv

// Init database connection
import sequelize from "./db";


const app: Express = express();
const port = process.env.PORT || 3000;

import userRoutes from "./routes/users";

app.use(userRoutes);


app.get("/", (req: Request, res: Response): void => {
  res.send("Hello World!");
});

(async () => {
//   await sequelize.sync({ force: true });
  await sequelize.sync();
  // Code here
  app.listen(port, (): void => {
    console.log(`Example app listening on port ${port}`);
  });
})();

// (function hello(){
//     console.log('Hello')
// })();
