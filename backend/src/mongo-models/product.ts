import mongoose, { Schema, Document } from "mongoose";

interface IProduct extends Document {
    productName: string;
    description?: string;
    price: number;
    state: boolean; // true if the product is published to customers.
    createdAt?: Date;
    test: string;
}

const productSchema: Schema = new Schema<IProduct>({
    productName: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    state: { type: Boolean, required: true },
    test: { type: String },
    // createdAt: { type: Date.now, required: true },
});

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
