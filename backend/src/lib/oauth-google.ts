import passport from "passport"; //https://www.npmjs.com/package/@types/passport
import * as JWT from "@/lib/jsonWebToken";
import express, { Request, Response, Express, NextFunction } from "express";
import User from "@/postgres-models/user";
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github").Strategy;

const BACK_END_BASE_URL = process.env.BACK_END_BASE_URL || 'http://localhost:3000'
const FRONT_END_BASE_URL = process.env.FRONT_END_BASE_URL || 'http://localhost:5173'

module.exports = function (
    app: express.Express,
    passport: passport.PassportStatic
) {
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
        return;
    }

    // https://www.passportjs.org/packages/passport-google-oauth20/
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: BACK_END_BASE_URL + "/auth/google/secrets",
            },

            /* To-do: Rewrite in TypeScript */
            async function (
                accessToken: string,
                refreshToken: any,
                profile: any,
                cb: Function
            ): Promise<void> {
                console.log("accessToken", accessToken);
                console.log("refreshToken", refreshToken);
                console.log("profile", profile);
                // profile._raw
                try {
                    const user = await User.findOrCreate({
                        where: {
                            userId: profile._json.sub,
                            // userOAuthToken: accessToken,
                            userOAuthProvider: "google",
                        },
                        defaults: {
                            userPassword: accessToken,
                            userEmail: profile._json.email,
                            userFamilyName: profile._json.family_name,
                            userGivenName: profile._json.given_name,
                            userProfilePictureUrl: profile._json.picture,
                            userPermission: "user",
                        },
                    });
                    console.log("!!!!!!!!!!!!!!!!!!!!!!!!");
                    console.log("user");
                    console.log("!!!!!!!!!!!!!!!!!!!!!!!!");

                    if (user) {
                        cb(null, {
                            userId: profile._json.sub,
                        });
                    } else {
                        cb(user, null);
                    }
                } catch (error) {
                    cb(error, null);
                }
            }
        )
    );

    app.get(
        "/auth/google",
        passport.authenticate("google", { scope: ["profile", "email"] })
    );

    app.get(
        "/auth/google/secrets",
        passport.authenticate("google", { failureRedirect: "/login" }),
        function (req: Request, res: Response): void {
            const jwt: String = JWT.create({
                // @ts-ignore
                userId: req.user.userId,
            });

            res.cookie("token", jwt);
            res.redirect(`${FRONT_END_BASE_URL}/oauth`);
        }
    );
};
