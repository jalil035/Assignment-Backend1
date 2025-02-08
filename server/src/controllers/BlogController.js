import * as blogService from "../service/blogService.js";

export const createBlog = async (req, res) => {
    try {
        const blogData = req.body;
        const newBlog = await blogService.createBlog(blogData);
        res.status(201).json({ status: true, data: newBlog,msg:"create success" });
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
};

export const getBlogs = async (req, res) => {
    try {
        const blogs = await blogService.getAllBlogs();
        res.status(200).json({ status: true, data: blogs });
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
};

export const getBlogById = async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await blogService.getBlogById(blogId);
        res.status(200).json({ status: true, data: blog });
    } catch (error) {
        res.status(404).json({ status: false, error: error.message });
    }
};

export const updateBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const updatedData = req.body;
        const updatedBlog = await blogService.updateBlog(blogId, updatedData);
        res.status(200).json({ status: true, data: updatedBlog,msg:"updated successfully." });
    } catch (error) {
        res.status(404).json({ status: false, error: error.message });
    }
};

export const deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const message = await blogService.deleteBlog(blogId);
        res.status(200).json({ status: true, message:"deleted successfully." });
    } catch (error) {
        res.status(404).json({ status: false, error: error.message });
    }
};
