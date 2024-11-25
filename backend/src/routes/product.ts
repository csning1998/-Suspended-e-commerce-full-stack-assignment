import express, { Router, Request, Response } from 'express';
import * as JWTToken from "../lib/jwt-token";
// import "dotenv.config";
import { statusCodes } from "../lib/statusCodes";
import ProductModel from "../mongo-models/product";
import { Schema } from "mongoose";


const router: Router = express.Router();

const HTTPJsonResponse = function (res: Response, status: any, payload:any) {
    return res.status(status).json({
        payload,
        ...status,
    });
}

const HTTPJsonUserErrorResponse = function (res: Response, error: Error, statusCode: 400){
    return res.status(statusCode).json({
        message: error.message,
    });
}

/*
* User can view and search products without login.
* This route aims to retrieve all published merchandise (filtering by the state column).
* Assume the only query strings we would receive is "Keyword"
* */

router.get('/products', async (req: Request, res: Response) => {

    const {productName} = req.body;
    console.log("queryString: ", productName);

    try {


    } catch (err) {

    }
})

export default router
