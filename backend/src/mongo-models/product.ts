import mongoose, { Schema, Document } from "mongoose";

interface IOptionValue {
    value: number | string;
    priceAdj: number;
}

interface IProductOptions {
    name: string;
    values: IOptionValue[];
}

interface IProduct extends Document {
    supplierId: number;
    brand: string;
    link2Pic: string;
    basePrice: number;
    discountPrice: number;
    collectionName: string;
    title: string;
    options: IProductOptions[];
}
// https://mongoosejs.com/docs/schematypes.html#:~:text=Buffer%22%2C%22data%22%3A%5B1%2C2%2C3%5D%7D-,Mixed,-An%20%22anything%20goes
const productSchema: Schema = new Schema<IProduct>({
    supplierId: { Number },
    brand: { type: String },
    link2Pic: { type: String },
    basePrice: { type: Number },
    discountPrice: { type: Number },
    collectionName: { type: String },
    title: { type: String },
    // options: [],
    options: [
        {
            name: { type: String },
            values: [
                {
                    value: { type: Schema.Types.Mixed },
                    priceAdj: { type: Number },
                },
            ],
        },
    ],
});

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
