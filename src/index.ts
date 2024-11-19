import express, { Request, Response, Express } from "express";
import "dotenv/config"; // https://www.npmjs.com/package/dotenv
import cors from "cors"
import bodyParser from "body-parser";


// Init database connection
import sequelize from "./db";



// "scripts": {
//   "dev": "concurrently \"tsc --watch\" \"nodemon dist/index.js\""
// }

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(cors({
  origin: '*'
}));
// app.use(bodyParser.urlencoded({ extended: false })); // Setup body parser

app.use(bodyParser.json())

import userRoutes from "./routes/users";
// import sessionRoutes from "./routes/session"

app.use('/users', userRoutes);
// app.use('/', sessionRoutes);


app.get("/", (req: Request, res: Response): void => {
  res.send("Hello World!");
});

// Main function, only run once at the application startup.
(async (): Promise<void> => {

  try {
    // Add Schemas here. https://stackoverflow.com/questions/42497254/sequelize-schema-for-postgresql-how-to-accurately-define-a-schema-in-a-model
    await sequelize.createSchema('user_management', { logging: false });
    // await sequelize.createSchema('some_schema', { logging: false });
    // await sequelize.createSchema('some_schema', { logging: false });
    // await sequelize.createSchema('some_schema', { logging: false });
  }catch (e) {
    // DO NOTHING
  }

  try {

    await sequelize.sync({
      // force: true,
      alter: true
    });

  } catch (err) {
    console.error("error", err);
  }


  // Code here
  app.listen(port, (): void => {
    console.log(`E-Commerce Application is listening on port ${port}`);
    console.log("\n========== Console Logging Below ==========\n");

  });
})();

// (function hello(){
//     console.log('Hello')
// })();
