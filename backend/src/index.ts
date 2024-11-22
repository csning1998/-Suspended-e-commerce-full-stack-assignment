import express, { Request, Response, Express } from "express";
import "dotenv/config"; // https://www.npmjs.com/package/dotenv
import cors from "cors"; // Enable Cross-Origin Resource Sharing
import bodyParser from "body-parser"; // Parse incoming request bodies
import userRoutes from "./routes/users";

// Initialize database connection
import sequelize from "./db";

const app: Express = express();
const port: string | 3000 = process.env.PORT || 3000;

/*
* Middlewares here
* */

// for handling CORS
app.use(cors({
  origin: '*'
}));

// for JsnWebToken Secret
// const token: string = jwt.sign({ data: 'payload' }, 'secret');
app.use(express.json());

// for parsing JSON payloads
app.use(bodyParser.json())

// for routes
app.use('/users', userRoutes);


// Import route handlers here
// import sessionRoutes from "./routes/session"


// Root route for basic health check
app.get("/", (req: Request, res: Response): void => {
  res.send("Hello World!");
});

// Main function, only run once at the application startup.
(async (): Promise<void> => {

/*
* Add Schemas here. https://stackoverflow.com/questions/42497254/sequelize-schema-for-postgresql-how-to-accurately-define-a-schema-in-a-model
* Create schemas if not already present in the database
* */
  try {
    await sequelize.createSchema('user_management', { logging: false });
    // await sequelize.createSchema('some_schema', { logging: false });
    // await sequelize.createSchema('some_schema', { logging: false });
    // await sequelize.createSchema('some_schema', { logging: false });

  } catch (err) {
    // Ignore schema creation errors (e.g., schema already exists)
  }

  try {
    // Sync database models with the database
    await sequelize.sync({
      // force: true,  // for development to reset tables
      alter: true      // Safe adjustment for schema updates
    });

  } catch (err) {
    console.error("error", err);
  }

  // Start the application, listening on the specified port
  app.listen(port, (): void => {
    console.log(`E-Commerce Application is listening on port ${port}`);
    console.log("\n========== Console Logging Below ==========\n");

  });
})();
