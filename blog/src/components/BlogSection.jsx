import React, { useEffect, useState } from "react";
import {
    getBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    getBlogById
} from "../apirequest/api";

const BlogSection = () => {
    const [blogs, setBlogs] = useState([]); // All Blogs State
    const [selectedBlog, setSelectedBlog] = useState(null); // Single Blog View State
    const [newBlog, setNewBlog] = useState({ title: "", content: "",author:"",tags:"",imageUrl:"" }); // New Blog State
    const [editBlogData, setEditBlogData] = useState(null); // Blog Edit State
    const [loading, setLoading] = useState(false); // Loading State
    const [error, setError] = useState(null); // Error State

    //  Blogs Load করার জন্য useEffect
    useEffect(() => {
        loadBlogs(); //  শুধু প্রথমবার ফেচ করবে
    }, []);

    //  Blogs Fetch করার জন্য Helper Function
    const loadBlogs = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getBlogs(); // API থেকে ডেটা ফেচ করুন
            console.log("Fetched data:", response?.data); // কনসোল লগ
            if ( Array.isArray( response?.data)) {
                setBlogs( response?.data); // স্টেট আপডেট করুন
            } else {
                console.error("Invalid data format:", );
                setBlogs([]);
            }
        } catch (err) {
            console.error("Error fetching blogs:", err);
            setError("Failed to fetch blogs. Please try again later.");
        } finally {
            setLoading(false);
        }
    };



    // ✅ Blog Create করার জন্য
    const handleCreateBlog = async () => {
        if (newBlog.title && newBlog.content) {
            const blogData = {
                title: newBlog.title,
                content: newBlog.content,
                author: "Numan",
                tags: ["React", "Coding"],
                imageUrl: "https://example.com/sample-image.jpg"
            };
            try {
                const createdBlog = await createBlog(blogData);
                if (createdBlog) {
                    setBlogs((prevBlogs) => [createdBlog, ...prevBlogs]); // ✅ লোকাল স্টেট আপডেট
                    setNewBlog({ title: "", content: "" ,author:"",tags:"",imageUrl:""});
                }
            } catch (err) {
                console.error("Failed to create blog:", err);
                setError("Failed to create blog. Please try again.");
            }
        }
    };

    //njer moto koray tay

    // const handleCreateBlog = async () => {
    //     if (IsEmpty(newBlog.title)) {
    //         ErrorToast("Blog Title is required.");
    //     } else if (IsEmpty(newBlog.content)) {
    //         ErrorToast("Blog Content is required.");
    //     } else if (IsEmpty(newBlog.author)) {
    //         ErrorToast("Blog Author is required.");
    //     } else if (IsEmpty(newBlog.tags)) {
    //         ErrorToast("Blog Tags are required.");
    //     } else if (IsEmpty(newBlog.imageUrl)) {
    //         ErrorToast("Blog Image URL is required.");
    //     } else {
    //         try {
    //             const result = await createBlog(newBlog);
    //             if (result) {
    //                 setBlogs((prevBlogs) => [result, ...prevBlogs]);
    //                 setNewBlog({ title: "", content: "", author: "", tags: "", imageUrl: "" });
    //                 SuccessToast("Blog created successfully!");
    //             }
    //         } catch (err) {
    //             console.error("Failed to create blog:", err);
    //             setError("Failed to create blog. Please try again.");
    //         }
    //     }
    // };





    // ✅ Blog Update করার জন্য
    const handleUpdateBlog = async () => {
        if (editBlogData && editBlogData.title && editBlogData.content) {
            try {
                const updatedBlog = await updateBlog(editBlogData._id, editBlogData);
                if (updatedBlog) {
                     // Refresh Blogs List
                    setEditBlogData(null); // Clear Edit Form
                }
            } catch (err) {
                console.error("Failed to update blog:", err);
                setError("Failed to update blog. Please try again.");
            }
        }
    };

    // ✅ Blog Delete করার জন্য
    const handleDeleteBlog = async (id) => {
        try {
            const isDeleted = await deleteBlog(id);
            if (isDeleted) {
                 // Refresh Blogs List
            }
        } catch (err) {
            console.error("Failed to delete blog:", err);
            setError("Failed to delete blog. Please try again.");
        }
    };
    // let handleDeleteBlog = async (id) => {
    //     let result = await deleteBlog(id);
    //     if (result) {
    //         let result = await getBlogs();
    //         setBlogs(result);
    //     }
    // };

    // ✅ Blog Details Fetch করার জন্য
    const handleViewBlog = async (id) => {
        try {
            const blog = await getBlogById(id);
            if (blog) {
                setSelectedBlog(blog); // Set Selected Blog
            }
        } catch (err) {
            console.error("Failed to fetch blog details:", err);
            setError("Failed to load blog details. Please try again.");
        }
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
                Blog Management
            </h1>

            {/* Error Display */}
            {error && (
                <div className="mb-4 bg-red-100 text-red-800 p-4 rounded">
                    {error}
                </div>
            )}

            {/* Blog Creation Section */}
            <div className="mb-8 bg-white p-6 shadow-md rounded-md">
                <h2 className="text-2xl font-bold mb-4">Create Blog</h2>

                <div>
                    <label className="text-lg font-semibold">title Name:</label>
                    <input
                        type="text"
                        placeholder="Blog Title"
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                        value={newBlog.title}
                        onChange={(e) => setNewBlog({...newBlog, title: e.target.value})}
                    />
                </div>

                <div>
                    <label className="text-lg font-semibold">Blog content:</label>
                    <textarea
                        placeholder="Blog Content"
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                        value={newBlog.content}
                        onChange={(e) => setNewBlog({...newBlog, content: e.target.value})}
                    />
                </div>
                <div>
                    <label className="text-lg font-semibold">Blog author:</label>
                    <input
                        type="text"
                        placeholder="blog author"
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                        value={newBlog.author}
                        onChange={(e) => setNewBlog({...newBlog, author: e.target.value})}
                    />
                </div>

                <div>
                    <label className="text-lg font-semibold">Blog tags:</label>
                    <input
                        placeholder="Blog tags"
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                        value={newBlog.tags}
                        onChange={(e) => setNewBlog({...newBlog, tags: e.target.value})}
                    />
                </div>
                <div>
                    <label className="text-lg font-semibold">Image URL:</label>
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={newBlog.imageUrl}
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                        onChange={(e) => setNewBlog({...newBlog, imageUrl: e.target.value})}
                    />
                </div>

                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={handleCreateBlog}
                >
                    Create Blog
                </button>
            </div>

            {/* Blog Edit Section */}
            {editBlogData && (
                <div className="mb-8 bg-white p-6 shadow-md rounded-md">
                    <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
                    <div>
                        <label className="text-lg font-semibold">title Name:</label>
                        <input
                            type="text"
                            placeholder="Blog Title"
                            className="w-full p-2 mb-4 border border-gray-300 rounded"
                            value={newBlog.title}
                            onChange={(e) => setNewBlog({...newBlog, title: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="text-lg font-semibold">Blog content:</label>
                        <textarea
                            placeholder="Blog Content"
                            className="w-full p-2 mb-4 border border-gray-300 rounded"
                            value={newBlog.content}
                            onChange={(e) => setNewBlog({...newBlog, content: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="text-lg font-semibold">Blog author:</label>
                        <input
                            type="text"
                            placeholder="blog author"
                            className="w-full p-2 mb-4 border border-gray-300 rounded"
                            value={newBlog.author}
                            onChange={(e) => setNewBlog({...newBlog, author: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="text-lg font-semibold">Blog tags:</label>
                        <input
                            placeholder="Blog tags"
                            className="w-full p-2 mb-4 border border-gray-300 rounded"
                            value={newBlog.tags}
                            onChange={(e) => setNewBlog({...newBlog, tags: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="text-lg font-semibold">Image URL:</label>
                        <input
                            type="text"
                            placeholder="Image URL"
                            value={newBlog.imageUrl}
                            className="w-full p-2 mb-4 border border-gray-300 rounded"
                            onChange={(e) => setNewBlog({...newBlog, imageUrl: e.target.value})}
                        />
                    </div>
                    <button
                        className="bg-green-600 text-white px-4 py-2 mr-2 rounded hover:bg-green-700"
                        onClick={handleUpdateBlog}
                    >
                        Update Blog
                    </button>
                    <button
                        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                        onClick={() => setEditBlogData(null)}
                    >
                        Cancel
                    </button>
                </div>
            )}

            {/* Loader */}
            {loading && <p className="text-center text-blue-500">Loading blogs...</p>}

            {/* Blog List Section */}
            {!loading && blogs.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">All Blogs</h2>
                    <ul className="space-y-4">
                        {blogs.map((blog) => (
                            <li key={blog._id} className="bg-white p-4 shadow-md rounded-md">
                                <h3 className="text-xl font-semibold">{blog.title}</h3>
                                <div className="mt-2 flex space-x-4">
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                        onClick={() => handleViewBlog(blog._id)}
                                    >
                                        View
                                    </button>
                                    <button
                                        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                                        onClick={() => setEditBlogData(blog)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                        onClick={() => handleDeleteBlog(blog._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Blog Details Section */}
            {selectedBlog && (
                <div className="bg-white p-6 shadow-md rounded-md">
                    <h2 className="text-2xl font-semibold">{selectedBlog.title}</h2>
                    <p className="mt-4">{selectedBlog.content}</p>
                    <button
                        className="mt-4 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                        onClick={() => setSelectedBlog(null)}
                    >
                        Back
                    </button>
                </div>
            )}

            {/* No Blogs */}
            {!loading && blogs.length === 0 && (
                <p className="text-center text-gray-500">No blogs available.</p>
            )}
        </div>
    );
};

export default BlogSection;
