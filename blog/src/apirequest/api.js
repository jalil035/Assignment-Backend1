import axios from "axios";
import {DeleteAlert, ErrorToast, SuccessToast} from "../helper/helper";

let baseURL="http://localhost:6060/api"

class ApiCall {
    async register(reqBody) {
        try {
            let result = await axios.post(`${baseURL}/register`, reqBody);
            if (result.data.status === true) {
                SuccessToast(result.data.msg);
                return true;
            } else {
                ErrorToast (result.data.msg);
                return false;
            }
        }catch(err) {
            ErrorToast("Something went wrong!");
            console.log(err);
        }
    }


    async login(reqBody) {
       try {
           let result = await axios.post(`${baseURL}/login`, reqBody, {
               withCredentials: true,
           });
           if (result.data.status === true) {
               SuccessToast(result.data.msg);
               return true;
           } else {
               ErrorToast(result.data.msg);
               return false;
           }
       }catch(err) {
           ErrorToast("Something went wrong!");
           console.log(err);
       }
    }

    async logout() {
        try {
            let result = await axios.get(`${baseURL}/logout`,{
                withCredentials: true,
            });
            if (result.data.status === true) {
                SuccessToast(result.data.msg);
                return true;
            } else {
                ErrorToast(result.data.msg);
                return false;
            }
        }catch(err) {
            ErrorToast("Something went wrong!");
            console.log(err);
        }
    }

    async createProduct(reqBody) {
       try {
           let result = await axios.post(`${baseURL}/createProduct`, reqBody);
           if (result.data.status === true) {
               console.log(result.data.status)
               SuccessToast(result.data.msg);
               return true;
           } else {
               ErrorToast(result.data.msg);
               return false;
           }
       }catch(err) {
           ErrorToast("Something went wrong!");
           console.log(err);
       }
    }

    async getAllProduct() {
       try {
           let result = await axios.get(`${baseURL}/AllProduct`);
           if (result.data.status === true) {
               return result?.data.data;
           } else {
               ErrorToast("product unccesfully;");
               return false;
           }
       }catch(error) {
           ErrorToast("Something went wrong!");
          console.log(error);
       }
    }

    async deleteProduct(id) {
       try {
           let isConfirmed = await DeleteAlert();

           console.log(isConfirmed);

           if (isConfirmed) {
               let result = await axios.delete(`${baseURL}/deleteProduct/` + id);
               if (result.data.status === true) {
                   SuccessToast(result.data.msg);
                   return true;
               } else {
                   ErrorToast(result.data.msg);
                   return false;
               }
           }
       }catch(err) {
           ErrorToast("Something went wrong!");
           console.log(err);
       }
    }


    async fileUpload(reqBody) {
        try {
            let result = await axios.post(`${baseURL}/fileUpload`, reqBody,
                { headers: {'Content-Type': 'multipart/form-data'}});
            if (result.data.status === true) {
                SuccessToast(result.data.msg);
                return result;
            } else {
                ErrorToast(result.data.msg);
                return false;
            }
        }catch (error){
            ErrorToast("Something went wrong!");
            console.log(error);

        }
    }

    async ContactMessage(reqBody) {
        try {

            let result = await axios.post(`${baseURL}/contact`, reqBody);
            if (result.data.status === true) {
                // SuccessToast(result.data.msg); // সফল মেসেজ টোস্ট দেখানো
                return true;
            } else {
                ErrorToast(result.data.msg);
                return false;
            }
        } catch (error) {
            console.error( error);

        }
    }




    /**
     * Fetch all team members
     */
        // Fetch all team members
    async getAllTeamMembers() {
        try {
            let result = await axios.get(`${baseURL}/getAllTeamMembers`);
            console.log(result)
            if (result.data.status === true) {
                return result?.data?.data;
            } else {
                ErrorToast("addmember unsucces");
                return false;
            }
        } catch (err) {
            ErrorToast("Something went wrong while fetching team members!");
            console.error(err);
        }
    };

    async addTeamMember(reqBody) {
        try {
            let result = await axios.post(`${baseURL}/addTeamMember`, reqBody);
            console.log(result)
            if (result.status === 201) {
                SuccessToast("addmember succes");
                return true;
            } else {
                ErrorToast("addmember unsucces");
                return false;
            }
        }catch(err) {
            ErrorToast("Something went wrong!");
            console.log(err);
        }
    }


    //UpdateTeamMember

    // async updateTeamMember(id, reqBody) {
    //     try {
    //         let result = await axios.put(`${baseURL}/updateTeamMember/${id}`, reqBody);
    //         if (result.data.status === true) {
    //             SuccessToast("Team member updated successfully!");
    //             return result.data.data; // Assuming updated member is in result.data.data
    //         } else {
    //             ErrorToast(result.data.msg || "Error updating team member.");
    //             return null;
    //         }
    //     } catch (err) {
    //         // Provide more detailed error feedback
    //         ErrorToast("Something went wrong while updating the team member!");
    //         console.error("Error in updating team member:", err); // More context in the console
    //         return null;
    //     }
    // };
    async updateTeamMember(id, reqBody) {
        try {
            const response = await axios.put(`${baseURL}/updateTeamMember/${id}`, reqBody,{
                withCredentials: true
            });
            if (response.data?.status) { // Null-safe চেক
                SuccessToast("Team member updated successfully!");
                return response.data.data; // Assuming updated member info is here
            } else {
                const errorMessage = response.data?.msg || "Error updating team member.";
                ErrorToast(errorMessage);
                return null;
            }

        } catch (error) {
            // উন্নত এরর হ্যান্ডলিং
            if (error.response) {
                console.error("API Error:", error.response.data); // API থেকে সরাসরি ডেটা দেখানো
                ErrorToast(error.response.data.msg || "Failed to update member.");
            } else if (error.request) {
                console.error("No response from API:", error.request);
                ErrorToast("No response from server!");
            } else {
                console.error("Unexpected Error:", error.message);
                ErrorToast("Something went wrong!");
            }
            return null;
        }
    }

// Delete a team member
    async deleteTeamMember(id) {
        try {
            let isConfirmed = await DeleteAlert();

            console.log(isConfirmed);

            if (isConfirmed) {
                let result = await axios.delete(`${baseURL}/deleteTeamMember/` + id);
                if (result.data.status === true) {
                    SuccessToast("delete succesfully");
                    return false;
                } else {
                    ErrorToast("delete unccesfully");
                    return true;
                }
            }
        } catch (err) {
            ErrorToast("Something went wrong while deleting the team member!");
            console.error(err);
            return false;
        }
    };



//blog api golo




    async getBlogs() {
        try {
            const response = await axios.get(`${baseURL}/getBlogs`);
            return response.data;
        } catch (error) {
            ErrorToast("Error fetching blogs!");
            console.error("Error fetching blogs", error);
            return [];
        }
    }


    // ✅ নির্দিষ্ট ব্লগ লোড করার AP

    async getBlogById(id) {
        try {
            const response = await axios.get(`${baseURL}/getBlogById/${id}`);
            return response.data;
        } catch (error) {
            ErrorToast("Error fetching blog by ID!");
            console.error("Error fetching blog by ID", error);
            return null;
        }
    }

    // ✅ নতুন ব্লগ তৈরি করার API
    async createBlog(blogData) {
        try {
            const response = await axios.post(`${baseURL}/createBlog`, blogData);
            if (response.status === 201) {
                console.log(response.data.data);
                SuccessToast(response.data.msg);
                return response.data;
            } else {
                ErrorToast("Error creating blogs");
                return null;
            }
        } catch (error) {
            ErrorToast("Error creating blog!");
            console.error("Error creating blog", error);
            return null;
        }
    }


    // ✅ ব্লগ আপডেট করার API
    async updateBlog(id, updatedData) {
        try {
            const response = await axios.put(`${baseURL}/updateBlog/${id}`, updatedData);
            if (response.data.status) {
                SuccessToast(response.data.msg);
                return response.data;
            } else {
                ErrorToast(response.data.msg);
                return null;
            }
        } catch (error) {
            ErrorToast("Error updating blog!");
            console.error("Error updating blog", error);
            return null;
        }
    }

    // ✅ ব্লগ ডিলিট করার API
    async deleteBlog(id) {
        try {
            const response = await axios.delete(`${baseURL}/deleteBlog/${id}`);
            if (response.data.status) {
                SuccessToast(response.data.msg);
                return true;
            } else {
                ErrorToast(response.data.msg);
                return false;
            }
        } catch (error) {
            ErrorToast("Error deleting blog!");
            console.error("Error deleting blog", error);
            return false;
        }
    }
}





export const { register, login, logout, createProduct, getAllProduct, deleteProduct, fileUpload, ContactMessage,
   //TeamMember
    getAllTeamMembers,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    //blogSection
    getBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog
} = new ApiCall();