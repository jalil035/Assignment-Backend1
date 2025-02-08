import ServiceModel from "../model/ServiceModel.js";

export const getAllService = async () => {
    try {
        const data = await ServiceModel.find({});
        return { status: true, data };
    } catch (error) {
        return { status: false, error: error.message };
    }
};

export const addService = async (data) => {
    const { title,description,price,img,phone } = data;

    // Validate required fields
    if (!title || !description || !price) {
        throw new Error("Title, description, and price are required!");
    }

    // Create and save new service
    const newService = new ServiceModel({ title,description,price,img,phone });
    return await newService.save();
};

export const updateService = async (id, data) => {
    try {
        const updatedService = await ServiceModel.findByIdAndUpdate(id, data, { new: true });
        if (!updatedService) throw new Error("Service not found!");
        return updatedService;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const deleteService = async (id) => {
    try {
        const deletedService = await ServiceModel.findByIdAndDelete(id);
        if (!deletedService) throw new Error("Service not found!");
        return deletedService;
    } catch (error) {
        throw new Error(error.message);
    }
};
