import BlogModel from "../model/BlogModel.js";

export const createBlog = async (data) => {
    try {
        return await BlogModel.create(data);
    } catch (error) {
        throw new Error("Failed to create blog: " + error.message);
    }
};

export const getAllBlogs = async () => {
    try {
        return await BlogModel.find({});
    } catch (error) {
        throw new Error("Failed to fetch blogs: " + error.message);
    }
};

export const getBlogById = async (id) => {
    try {
        const blog = await BlogModel.findById(id);
        if (!blog) {
            throw new Error("Blog not found");
        }
        return blog;
    } catch (error) {
        throw new Error("Failed to fetch blog: " + error.message);
    }
};

export const updateBlog = async (id, data) => {
    try {
        const updatedBlog = await BlogModel.findByIdAndUpdate(id, data, { new: true });
        if (!updatedBlog) {
            throw new Error("Blog not found");
        }
        return updatedBlog;
    } catch (error) {
        throw new Error("Failed to update blog: " + error.message);
    }
};

export const deleteBlog = async (id) => {
    try {
        const deletedBlog = await BlogModel.findByIdAndDelete(id);
        if (!deletedBlog) {
            throw new Error("Blog not found");
        }
        return "Blog deleted successfully";
    } catch (error) {
        throw new Error("Failed to delete blog: " + error.message);
    }
};
