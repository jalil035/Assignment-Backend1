import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        message: { type: String, required: true },
        img: { type: String }, // Optional: ইমেজ ফিল্ড
    },
    { timestamps: true,
        versionKey: false,
    }
);

export const ContactModel = mongoose.model("Contacts", ContactSchema);

export default ContactModel;