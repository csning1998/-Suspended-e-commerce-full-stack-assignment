import express, {
    Express,
    Request,
    Response,
    NextFunction,
    Router,
} from "express";
import { statusCodes } from "../../lib/statusCodes";
import ProductModel from "../../mongo-models/product";
import { HTTPJsonResponse } from "../../lib/errorHandler";

const router: Router = express.Router();

router.post("/products", async (req: Request, res: Response): Promise<any> => {
    try {
        const { productName, description, price, state } = req.body;

        if (!productName || !price || !state) {
            return HTTPJsonResponse(
                res,
                statusCodes.QUERYING.MISSING_FIELD.code,
                {
                    ...req.body,
                },
            );
        }

        const newProduct = {
            ...req.body,
        };

        await newProduct.save();
        return HTTPJsonResponse(
            res,
            statusCodes.QUERYING.SUCCEED_INSERTED.code,
            newProduct,
        );
    } catch (error) {
        return HTTPJsonResponse(res, statusCodes.BACKEND_LOGIC.code, error);
    }
});

router.put(
    "/products/:id",
    async (req: Request, res: Response): Promise<any> => {
        try {
            const updates: any = req.body;
            const { id } = req.params;
            if (!id) {
                return HTTPJsonResponse(
                    res,
                    statusCodes.QUERYING.MISSING_FIELD.code,
                    {
                        ...req.body,
                    },
                );
            }

            const existingProduct = await ProductModel.findById(id);
            if (!existingProduct) {
                return HTTPJsonResponse(
                    res,
                    statusCodes.QUERYING.MISSING_PRODUCT.code,
                    {
                        ...req.body,
                    },
                );
            }

            const updatedProduct = await ProductModel.findByIdAndUpdate(
                id,
                updates,
                { new: true },
            );
            if (!updatedProduct) {
                return HTTPJsonResponse(res, statusCodes.BACKEND_LOGIC.code, {
                    ...req.body,
                });
            }

            return HTTPJsonResponse(
                res,
                statusCodes.QUERYING.SUCCEED_UPDATED.code,
                updatedProduct,
            );
        } catch (error) {
            return HTTPJsonResponse(res, statusCodes.BACKEND_LOGIC.code, error);
        }
    },
);

router.delete(
    "/products/:id",
    async (req: Request, res: Response): Promise<any> => {
        const { id } = req.params;
        try {
            await ProductModel.findByIdAndDelete(id);
            return HTTPJsonResponse(
                res,
                statusCodes.QUERYING.SUCCEED_DELETED.code,
                {
                    ...req.body,
                },
            );
        } catch (error) {
            return HTTPJsonResponse(res, statusCodes.BACKEND_LOGIC, error);
        }
    },
);
