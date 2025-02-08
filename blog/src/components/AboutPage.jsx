import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import {
    updateTeamMember,
    addTeamMember,
    deleteTeamMember,
    fileUpload, getAllTeamMembers,
} from "../apirequest/api";
import {ErrorToast, IsEmpty} from "../helper/helper";
import Loading from "./Loading";

const About = () => {
    let baseURL = "http://localhost:6060/upload-file/fetchAllTeamMembers";

    const [teamMembers, setTeamMembers] = useState([]);
    const [newMember, setNewMember] = useState({ "name": "", "position": "", "bio": "", "img": "" });
    const [editingMember, setEditingMember] = useState(null);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);

    // Fetch team members
    // useEffect(() => {
    //     const getMembers = async () => {
    //         setLoading(true);
    //         try {
    //             const data = await fetchAllTeamMembers();
    //             setTeamMembers(data);
    //         } catch (error) {
    //             console.error("Error fetching team members:", error);
    //         }
    //         setLoading(false);
    //     };
    // }, []);
    useEffect(() => {
        (async () => {
            let result = await getAllTeamMembers();
            setTeamMembers (result);
        })();
    }, []);
    // File Upload Function
    const handleFileUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            alert("Please select a file!");
            return;
        }
        const formData = new FormData();
        formData.append("file", file);
        const result = await fileUpload(formData);
        setNewMember({...newMember, img: result.data.file[0].filename});
        // const filename = result?.data?.file?.[0]?.filename;
        // try {
        //     const result = await fileUpload(formData);
        //     const filename = result?.data?.file?.[0]?.filename;
        //     if (filename) {
        //         if (editingMember) {
        //             setEditingMember((prev) => ({ ...prev, img: filename }));
        //         } else {
        //             setNewMember((prev) => ({ ...prev, img: filename }));
        //         }
        //     } else {
        //         alert("File upload failed! No filename received.");
        //     }
        // } catch (error) {
        //     console.error("File upload failed:", error);
        // }
    };

    // Add Team Member
    // const handleAddMember = async () => {
    //     try {
    //         if (!newMember.name || !newMember.position || !newMember.bio || !newMember.img) {
    //             alert("All fields are required!");
    //             return;
    //         }
    //
    //         const newAddedMember = await addTeamMember(newMember);
    //
    //         if (newAddedMember) {
    //             const updatedMembers = await getAllTeamMembers();
    //             setTeamMembers(updatedMembers);
    //             setNewMember({ name: "", position: "", bio: "", img: "" });
    //         } else {
    //             console.error("Failed to add member: Received null response");
    //         }
    //     } catch (error) {
    //         console.error("Error adding team member:", error);
    //     }
    // };

    let handlesubmitnewMember = async () => {
        if (IsEmpty(newMember.name)) {
            ErrorToast("newMember Name is required.");
        } else if (IsEmpty(newMember.position)) {
            ErrorToast("newMember Price is required.");
        } else if (IsEmpty(newMember.bio)) {
            ErrorToast("newMember Des is required.");
        } else if (IsEmpty(newMember.img)) {
            ErrorToast("newMember Image is required.");
        } else {
            let result = await addTeamMember(newMember);

            console.log(result);
        }

    };



  //  updateMember.
    let handleUpdateMember = async (id) => {
        console.log("New Member Data:", newMember);
        // খালি চেক
        const IsEmpty = (value) => !value || value.trim() === "";
        if (IsEmpty(newMember.name) || IsEmpty(newMember.position) || IsEmpty(newMember.bio) || IsEmpty(newMember.img)) {
            ErrorToast("All fields are required to update the member!");
            return;
        }
        try {
            // মেম্বার আপডেট করার জন্য API কল
            let result = await updateTeamMember(id, newMember);
            if (result) {
                // নতুন মেম্বার লিস্ট ফেচ করা
                let updatedMembers = await getAllTeamMembers();
                console.log("Fetched Members from API:", updatedMembers);
                setTeamMembers(updatedMembers);
                setNewMember({ name: "", position: "", bio: "", img: "" }); // ইনপুট রিসেট করা
                console.log("Member updated successfully!");
            }
        } catch (error) {
            console.error("Error updating team member:", error);
        }
    };
    let handleEditMember = (item) => {
        console.log("Editing Member:", item);
        setNewMember({
            name: item.name ,
            position: item.position,
            bio: item.bio,
            img: item.img,
        });
    };




    let handleDeleteMember = async (id) => {
        let result = await deleteTeamMember(id);
        if (result) {
            let result = await getAllTeamMembers();
            setTeamMembers(result);
        }
    };

    return (
        <>
            {/* Navbar */}

            {loading=== true && <Loading/>}
            <nav className="bg-amber-200 h-20 flex justify-center items-center">
                <h2 className="text-dark font-semibold text-3xl">About Team Management</h2>
            </nav>

            <div className="container mx-auto px-16 bg-blue-100 mt-5">
                <Tabs>
                    <TabList>
                        <Tab>Add Team Member</Tab>
                        <Tab>All Team Members</Tab>
                    </TabList>

                    {/* Add Team Member */}
                    <TabPanel>
                        <h2 className="text-xl font-semibold mb-4">Add New Team Member</h2>

                        <div className="py-10">
                            <div className="grid grid-cols-12 gap-6">
                                <div className="col-span-6">
                                    <label className="text-lg font-bold">Name:</label>
                                    <input
                                        type="text"
                                        onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                                        className="w-full rounded-lg border border-gray-700 p-3 shadow-sm"
                                    />
                                </div>
                                <div className="col-span-6">
                                    <label className="text-lg font-bold">Position:</label>
                                    <input
                                        type="text"
                                        onChange={(e) => setNewMember({ ...newMember, position: e.target.value })}
                                        className="w-full rounded-lg border border-gray-700 p-3 shadow-sm"
                                    />
                                </div>
                                <div className="col-span-12">
                                    <label className="text-lg font-bold">Bio:</label>
                                    <textarea
                                        onChange={(e) => setNewMember({ ...newMember, bio: e.target.value })}
                                        className="w-full rounded-lg border border-gray-700 p-3 shadow-sm"
                                    />
                                </div>
                                <div className="col-span-12">
                                    <label className="text-lg font-bold">Upload Image:</label>
                                    <form onSubmit={handleFileUpload}>
                                        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                                        <button className="bg-gray-900 text-white px-4 py-2 rounded-lg" type="submit">
                                            Upload
                                        </button>
                                    </form>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-3">
                                <button onClick={handlesubmitnewMember} className="bg-amber-700 px-5 py-3 text-white rounded-lg font-bold">
                                    Add Member
                                </button>
                            </div>
                        </div>
                        {/* Blog Edit Section */}
                        {editingMember && (
                            <div className="mb-8 bg-white p-6 shadow-md rounded-md">
                                <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
                                <div>
                                    <label className="text-lg font-bold">Name:</label>
                                    <input
                                        type="text"
                                        onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                                        className="w-full rounded-lg border border-gray-700 p-3 shadow-sm"
                                    />
                                </div>

                                <div>
                                    <label className="text-lg font-bold">Position:</label>
                                    <input
                                        type="text"
                                        onChange={(e) => setNewMember({...newMember, position: e.target.value})}
                                        className="w-full rounded-lg border border-gray-700 p-3 shadow-sm"
                                    />
                                </div>
                                <div>
                                    <label className="text-lg font-bold">Bio:</label>
                                    <textarea
                                        onChange={(e) => setNewMember({...newMember, bio: e.target.value})}
                                        className="w-full rounded-lg border border-gray-700 p-3 shadow-sm"
                                    />
                                </div>
                                <button
                                    className="bg-green-600 text-white px-4 py-2 mr-2 rounded hover:bg-green-700"
                                    onClick={handleUpdateMember}
                                >
                                    Update Blog
                                </button>
                                <button
                                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                                    onClick={() => setEditingMember(null)}
                                >
                                    Cancel
                                </button>
                            </div>
                        )};
                    </TabPanel>

                    {/* All Team Members */}
                    <TabPanel>
                        {loading ? (
                            <p className="text-center text-xl">Loading team members...</p>
                        ) : (
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-gray-500">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr className="bg-blue-400 text-white">
                                        <th className="px-6 py-3">Image</th>
                                        <th className="px-6 py-3">Name</th>
                                        <th className="px-6 py-3">Position</th>
                                        <th className="px-6 py-3">Bio</th>
                                        <th className="px-6 py-3">Action</th>
                                    </tr>
                                    </thead>
                                    {/*<tbody>*/}
                                    {/*{teamMembers.map((member) => (*/}
                                    {/*    <tr key={member.id} className="border-b hover:bg-gray-100">*/}
                                    {/*        <td className="px-6 py-4">*/}
                                    {/*            <img src={`${baseURL}${member.img}`} className="w-16 h-16 rounded-full" alt="/" />*/}
                                    {/*        </td>*/}
                                    {/*        <td className="px-6 py-4">{member.name}</td>*/}
                                    {/*        <td className="px-6 py-4">{member.position}</td>*/}
                                    {/*        <td className="px-6 py-4">{member.bio}</td>*/}
                                    {/*        <td className="px-6 py-4">*/}
                                    {/*            <button onClick={() => setEditingMember(member)}>Edit</button>*/}
                                    {/*            <button onClick={() => handleUpdateMember(member.id)}>Save</button>*/}
                                    {/*            <button onClick={() => handleDeleteMember(member.id)}>Delete</button>*/}
                                    {/*        </td>*/}
                                    {/*    </tr>*/}
                                    {/*))}*/}
                                    {/*</tbody>*/}

                                    <tbody>
                                    {
                                        teamMembers?.map((item, index) => (
                                            <tr key={index}
                                                className="bg-blue-50 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <td className='p-4'>
                                                    <img
                                                        src={baseURL + item?.img}
                                                        alt=''
                                                        className='w-[80px] h-[80px] object-cover'
                                                    />
                                                </td>
                                                <td className="px-6 py-4">{item?.name}</td>

                                                <td className="px-6 py-4">{item?.position}</td>

                                                <td className="px-6 py-4">{item?.bio}</td>

                                                <td className=' cursor-pointer px-6 py-10 flex gap-[2rem] justify-center items-center'>
                                                  <span
                                                      onClick={() => handleDeleteMember(item._id)}
                                                      className='font-medium text-red-600 dark:text-red-500 hover:underline'
                                                  >
                                                      Delete
                                                  </span>
                                                    <span
                                                        onClick={() => handleEditMember(item)}
                                                        className='font-medium text-red-600 dark:text-red-500 hover:underline'
                                                    >

                                                  </span>

                                                    <span
                                                        onClick={() => handleUpdateMember(item)}
                                                        className='font-medium text-red-600 dark:text-red-500 hover:underline'
                                                    >
                                                      Update
                                                  </span>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </TabPanel>
                </Tabs>
            </div>
        </>
    );
};

export default About;
