import express, { Request, Response, Express } from "express";
import "dotenv/config"; // https://www.npmjs.com/package/dotenv
import cors from "cors"; // Enable Cross-Origin Resource Sharing
import bodyParser from "body-parser"; // Parse incoming request bodies
import userRoutes from "./routes/users";
import productQuery from "./routes/product";
import adminProduct from "./routes/admin/product";
import { connect } from "mongoose";
import session from "express-session"; 
import passport from "passport";

import Product from "./mongo-models/product";

// Initialize database connection
import sequelize from "./db";

const app: Express = express();
const port: string | 3000 = process.env.PORT || 3000;
const MONGO_URI: string = process.env.MONGO_URI || "mongodb://mongo:27017/test";

/* Middlewares here */

// for handling CORS
app.use(
    cors({
        origin: "*",
    }),
);

// for JsnWebToken Secret
// const token: string = jwt.sign({ data: 'payload' }, 'secret');
app.use(express.json());

// for parsing JSON payloads
app.use(bodyParser.json());

// SET UP SESSION for OAuth ------below code comes from express-session

try {
    let secret: string | undefined = process.env.PASSPORT_LONG_SECRET
    if (secret || !(secret === undefined)) {
        app.use(session({
            secret: process.env.PASSPORT_LONG_SECRET || "Our little secret.",
            resave: false, 
            saveUninitialized: false
        }));
    }
} catch (err) {
    console.error("You have to provide secret.")
}

// Initialize and use passport.
app.use(passport.initialize());
app.use(passport.session());

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require('passport-github').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets"
  },

/* To-do: Rewrite in TypeScript
function (accessToken, refreshToken, profile, cb) {
    User.findOrCreate(
      { googleId: profile.id },
      function (err, user) {
        return cb(err, user);
      }
    );
  }
));
*/

// -------GITHUB STRATEGY--------
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/secrets"
  },

/* To-do: Rewrite in TypeScript

function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
*/

// for routes
app.use("/users", userRoutes);
app.use("/products", productQuery);

// Root route for basic health check
app.get("/", (req: Request, res: Response): void => {
    res.send("Hello World!");
});

import * as JWTToken from "./lib/jwt-token";


const allowManagementRoles = ['admin', 'supplier']
app.use(JWTToken.verity);
app.use(function (req, res, next) {

    // @ts-ignore
    console.log('req.currentUser.userPermission', req.currentUser.userPermission)
    console.log('allowManagementRoles', allowManagementRoles)
    // @ts-ignore
    if (!allowManagementRoles.includes(req.currentUser.userPermission)) {
        return next(new Error(`You must be one of ${allowManagementRoles.join(', ')}`));
    }

    next();
});
app.use("/admin", adminProduct);

/* Import route handlers here */

// ERROR HANDLER MUST BE THE FINAL ROUTE
require("./lib/errorHandler")(app);

/* 
 * Main function, only run once at the application startup.
 * */
// import mockProducts from '../../mock/product'
(async (): Promise<void> => {
    try {
        /*
         * Testing MongoDB connecting here.
         * */
        console.log("Connecting to mongo");
        const db = await connect(MONGO_URI);
        console.log("MongoDB is connected to ", db.connection.name);
        // await connect(MONGO_URI); // https://mongoosejs.com/docs/typescript.html

        // await Product.create({
        //     title: "test product",
        // })
    } catch (error) {
        console.error(error);
    }

    // if(await Product.countDocuments() === 0) {
    //     mockProducts.forEach(product => {
    //         const _product :any = product
    //         delete _product.id;
    //         Product.create(_product)
    //     })

    // }

    /*
     * Add Schemas here. https://stackoverflow.com/questions/42497254/sequelize-schema-for-postgresql-how-to-accurately-define-a-schema-in-a-model
     * Create schemas if not already present in the Postgres database
     * */
    console.log("Checking Postgres database schema");
    try {
        await sequelize.createSchema("user_management", { logging: false });
        // await sequelize.createSchema('add_some_schema', { logging: false });
    } catch (err) {
        // Ignore schema creation errors (e.g., schema already exists)
    }

    console.log("Syncing Postgres database");
    try {
        // Sync database postgres-models with the database
        await sequelize.sync({
            // force: true, // for development to reset tables
            alter: true, // Safe adjustment for schema updates
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
