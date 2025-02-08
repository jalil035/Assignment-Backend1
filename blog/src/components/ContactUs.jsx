import React, { useState, useRef } from "react";
import {ErrorToast, getBase64, IsEmpty, SuccessToast} from "../helper/helper";
import { ContactMessage } from "../apirequest/api";
import Loading from "../components/Loading";

const ContactUsForm = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        message: "",
        img: "",
    });

    const imageInputRef = useRef(null); // Image input reference

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = async (e) => {
        if (e.target.files.length > 0) {
            const result = await getBase64(e.target.files[0]);
            setFormData((prevData) => ({ ...prevData, img: result }));
        }
    };

    const validateForm = () => {
        for (const key in formData) {
            if (key !== "img" && IsEmpty(formData[key])) {
                ErrorToast(`${key} is required!`);
                return false;
            }
        }
        return true;
    };

    const submitData = async () => {
        if (!validateForm()) return;

        setLoading(true);
        try {
            const result = await ContactMessage(formData);
            if (result) {
                setFormData({
                    email: "",
                    firstName: "",
                    lastName: "",
                    phone: "",
                    message: "",
                    img: "",
                });

                // Clear file input explicitly
                if (imageInputRef.current) {
                    imageInputRef.current.value = "";
                }

                SuccessToast("Successfully submitted!");
            }
        } catch (error) {
            ErrorToast("Server error occurred!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-gray-100 min-h-screen flex justify-center items-center">
            {loading && <Loading />}
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                    <div className="max-w-md mx-auto">
                        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {["email", "firstName", "lastName", "phone", "message"].map((field) => (
                                <div key={field}>
                                    <label className="font-semibold text-sm text-gray-600 pb-1 block">
                                        {field.charAt(0).toUpperCase() + field.slice(1)}
                                    </label>
                                    {field !== "message" ? (
                                        <input
                                            name={field}
                                            value={formData[field]}
                                            onChange={handleInputChange}
                                            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                            type={field === "email" ? "email" : "text"}
                                            placeholder={`Enter your ${field}`}
                                        />
                                    ) : (
                                        <textarea
                                            name={field}
                                            value={formData[field]}
                                            onChange={handleInputChange}
                                            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                            rows="4"
                                            placeholder="Enter your message"
                                        ></textarea>
                                    )}
                                </div>
                            ))}
                            <div>
                                <label className="font-semibold text-sm text-gray-600 pb-1 block">
                                    Image (optional)
                                </label>
                                <input
                                    ref={imageInputRef} // Attach reference to input
                                    onChange={handleImageChange}
                                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                    type="file"
                                />
                            </div>
                        </div>
                        <div className="mt-5">
                            <button
                                onClick={submitData}
                                type="button"
                                className={`py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white w-full transition ease-in duration-200 text-center text-base font-semibold rounded-lg ${
                                    loading ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                                disabled={loading}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUsForm;
