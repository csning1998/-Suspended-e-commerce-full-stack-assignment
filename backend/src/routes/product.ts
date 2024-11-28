import express, { Router, Request, Response } from 'express';
import * as JWTToken from "../lib/jwt-token";
// import "dotenv.config";
import { statusCodes } from "../lib/statusCodes";
import ProductModel from "../mongo-models/product";
import { Schema } from "mongoose";
import Product from "../mongo-models/product";


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

router.get('/products', async (req: Request, res: Response): Promise<void> => {

    const { keyword } = req.body;
    try {
        const query = keyword
            ? {state: true, name: { $regex: keyword , $options: "i" }}
            : {state: true}
        const products = await ProductModel.find(query);

        HTTPJsonResponse(res, statusCodes.QUERYING.SUCCEED_BULK.code, {products});

    }  catch (err) {
        console.error(err);
        res.status(statusCodes.BACKEND_LOGIC.code).json({
            ...statusCodes.BACKEND_LOGIC,
        });
    }
})

router.get('products/:id', async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    try {
        const product = await ProductModel.findById(id);
        if (!product || !product.state) {
            return res.status(statusCodes.QUERYING.SUCCEED_UNPUBLISHED_PRODUCT.code).json({
                ...statusCodes.QUERYING.SUCCEED_UNPUBLISHED_PRODUCT
            });
        }
        return HTTPJsonResponse(res, statusCodes.QUERYING.SUCCEED_UNPUBLISHED_PRODUCT, product);
    } catch (error) {
        return HTTPJsonResponse(res, statusCodes.BACKEND_LOGIC, error);
    }
});

export default router
