import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        author: { type: String, required: true },
        tags: { type: [String] }, // Array of tags for categorization
        imageUrl: { type: String },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const BlogModel = mongoose.model("Blog", BlogSchema);

export default BlogModel;
