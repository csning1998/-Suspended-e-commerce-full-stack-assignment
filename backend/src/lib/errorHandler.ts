import { Express } from "express";
import type { ErrorRequestHandler } from "express";

// const app: Express = express();
// app.use(errorHandler);


module.exports = function(app: Express) {
  const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err)
    res.status(err.status || 500)
  
    if (app.get('env') === 'development') {
      app.locals.pretty = true
      res.json({
        payload: err.message
      })
    } else {
      res.json({
        payload: "Server error"
      })
    }
  };

  app.use(errorHandler);
}