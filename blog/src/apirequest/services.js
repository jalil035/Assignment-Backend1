import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/helper";

// Base API URL
const baseURL = "http://localhost:6060/api";

class ApiService {
    // Fetch all services
    async getAllServices() {
        try {
            const response = await axios.get(`${baseURL}/GetAll`);
            console.log("Services fetched:", response.data);

            if (response.data?.status === true) {
                return response.data.data || []; // Ensure data is returned as an array
            } else {
                ErrorToast(response.data?.message || "Failed to fetch services.");
                return [];
            }
        } catch (error) {
            ErrorToast("Something went wrong while fetching services!");
            console.error("Error fetching services:", error);
            return [];
        }
    }

    // Add a new service
    async addService(serviceData) {
        try {
            const response = await axios.post(`${baseURL}/add`, serviceData);
            console.log("Service added:", response.data);

            if (response.status === 201 || response.data?.status === true) {
                SuccessToast(response.data?.message || "Service added successfully!");
                return true;
            } else {
                ErrorToast(response.data?.message || "Failed to add service.");
                return false;
            }
        } catch (error) {
            ErrorToast("Something went wrong while adding a service!");
            console.error("Error adding service:", error);
            return false;
        }
    }

    // Delete a service
    async deleteService(id) {
        try {
            const response = await axios.delete(`${baseURL}/Delete/${id}`);
            console.log("Service deleted:", response.data);

            if (response.data?.status === true) {
                SuccessToast(response.data?.message || "Service deleted successfully!");
                return true;
            } else {
                ErrorToast(response.data?.message || "Failed to delete service.");
                return false;
            }
        } catch (error) {
            ErrorToast("Something went wrong while deleting the service!");
            console.error("Error deleting service:", error);
            return false;
        }
    }
}

// Export instance methods for easier use
const apiService = new ApiService();
export const { getAllServices, addService, deleteService } = apiService;
