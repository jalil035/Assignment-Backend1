import * as service from "../service/service.js";

export const getAll = async (req, res) => {
    try {
        const result = await service.getAllService();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};

export const add = async (req, res) => {
    try {
        const result = await service.addService(req.body);
        return res.status(201).json({ status: true, data: result, message: "Service added successfully!" });
    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
};

export const update = async (req, res) => {
    try {
        const data = await service.updateService(req.params.id, req.body);
        return res.status(200).json({ status: true, data, message: "Updated successfully." });
    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
};

export const Delete = async (req, res) => {
    try {
        const result = await service.deleteService(req.params.id);
        return res.status(200).json({ status: true, message: "Deleted successfully!" });
    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
};
