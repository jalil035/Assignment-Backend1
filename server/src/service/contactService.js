import { ContactModel } from "../model/ContactModel.js";

export const contactService = async (req) => {
    try {
        // `req.body` থেকে ডেটা গ্রহণ
        let reqBody = req.body;
        // নতুন ডেটা ডাটাবেসে যোগ করা
        let data = await ContactModel.create(reqBody);
        // সফল প্রতিক্রিয়া পাঠানো
        return {status: true, data: data, message: "Message received successfully!",};
    } catch (error) {
        // ত্রুটির ক্ষেত্রে প্রতিক্রিয়া
        return {status: false, error: error.message || "Something went wrong!",};
    }
};
