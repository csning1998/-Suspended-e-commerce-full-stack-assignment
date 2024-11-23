import mongoose, { Schema, Document } from 'mongoose';

interface IProduct extends Document {
  productName: string;
}

const productSchema: Schema = new Schema({
  productName: { type: String, required: true },
});

const ProductModel = mongoose.model('Product', productSchema);


export default ProductModel