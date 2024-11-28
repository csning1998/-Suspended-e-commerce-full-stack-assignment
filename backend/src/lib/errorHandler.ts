import { Express, NextFunction, Request, Response } from "express";
import type { ErrorRequestHandler } from "express";

// const app: Express = express();
// app.use(errorHandler);

export const HTTPJsonResponse = function (
    res: Response,
    status: any,
    payload: any,
): Response<any, Record<string, any>> {
    return res.status(status).json({
        payload,
        ...status,
    });
};

module.exports = function (app: Express): void {
    const errorHandler: ErrorRequestHandler = (
        err: any,
        req: Request,
        res: Response,
        next: NextFunction,
    ): void => {
        console.error(err);
        res.status(err.status || 500);

        if (app.get("env") === "development") {
            app.locals.pretty = true;
            res.json({
                payload: err.message,
            });
        } else {
            res.json({
                payload: "Server error",
            });
        }
    };

    app.use(errorHandler);
};
