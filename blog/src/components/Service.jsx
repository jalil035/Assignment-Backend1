import React, { useEffect, useState } from "react";
import { getAllServices, addService, deleteService } from "../apirequest/services";

const Service = () => {
    const [services, setServices] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        img: "",
        phone: "",
    });
    const [loading, setLoading] = useState(true);

    // Fetch services
    const fetchServices = async () => {
        try {
            const responseData = await getAllServices();

            if (responseData) {
                console.log("Fetched Service:", responseData);

                // Check if `data` is an array or single object
                if (Array.isArray(responseData)) {
                    setServices(responseData);
                } else if (responseData.data) {
                    setServices([responseData.data]); // Convert single object to array
                }
            }
        } catch (error) {
            console.error("Error fetching services:", error);
        } finally {
            setLoading(false);
        }
    };

    // Handle form change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Add a service
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await addService(formData);
            if (result) {
                alert("Service added successfully!");
                fetchServices();
                setFormData({ title: "", description: "", price: "", img: "", phone: "" });
            }
        } catch (error) {
            console.error("Error adding service:", error);
        }
    };

    // Delete a service
    const handleDelete = async (id) => {
        try {
            await deleteService(id);
            setServices(services.filter((service) => service._id !== id));
            alert("Service deleted successfully!");
        } catch (error) {
            console.error("Error deleting service:", error);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    return (
        <div className="container mx-auto my-8">
            <h1 className="text-3xl font-bold text-center mb-6">Service Management</h1>

            {/* Add Service Form */}
            <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto mb-8">
                <h2 className="text-2xl font-bold text-center mb-4">Add New Service</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="Service Title"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="Service Description"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="Price"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Image URL</label>
                        <input
                            type="text"
                            name="img"
                            value={formData.img}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="Image URL"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="Phone Number"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Add Service
                    </button>
                </form>
            </div>

            {/* Service List */}
            <div className="bg-gray-100 p-6 rounded shadow-md">
                <h2 className="text-2xl font-bold text-center mb-4">Service List</h2>
                {loading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                ) : services.length > 0 ? (
                    <ul className="space-y-4">
                        {services.map((service) => (
                            service ? (
                                <li key={service._id} className="flex justify-between items-center bg-white p-4 rounded shadow">
                                    <div>
                                        <h3 className="text-xl font-semibold">{service.title || "No Title"}</h3>
                                        <p>{service.description || "No Description"}</p>
                                        <p className="text-gray-600">${service.price || "N/A"}</p>
                                        <p className="text-gray-600">📞 {service.phone || "Phone"}</p>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(service._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </li>
                            ) : (
                                <li key={Math.random()} className="text-red-500">Invalid Service</li>
                            )
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-500">No services available.</p>
                )}
            </div>
        </div>
    );
};

export default Service;
