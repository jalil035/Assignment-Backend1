
import productModel from "../model/ProductModel.js";
import mongoose from "mongoose";
const ObjectID = mongoose.Types.ObjectId;

export const createProductService = async (req) => {
    try {
        let reqBody = req.body;
        let data = await productModel.create(reqBody);
        return { status: true, data: data, msg: "Product create success." };
    } catch (e) {
        return { status: false, error: e };
    }
};

export const getAllProductService = async () => {
    try {
        let data = await productModel.find({});
        return { status: true, data: data };
    } catch (e) {
        return { status: false, error: e };
    }
};


export const deleteProductService  = async (req,res) => {
    try {

        let id = new ObjectID(req.params.id);
        let result = await productModel.deleteOne({_id: id});

        return { status: true, data: result, msg: "Product deleted success." };
    } catch (e) {
        return { status: false, error: e };
    }
};
