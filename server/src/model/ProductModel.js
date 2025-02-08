import mongoose from "mongoose";
const DataSchema = mongoose.Schema(
    {
        productName: { type: String, required: true },
        productPrize: { type: String },
        productDes: { type: String },
        img: { type: String },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const ProductModel = mongoose.model("products", DataSchema);

export default ProductModel;
