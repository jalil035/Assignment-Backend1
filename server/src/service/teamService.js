import TeamModel from "../model/TeamModel.js";


export const getAllTeamMembersService = async () => {

 try{
     let data =  await TeamModel.find({});
     return {status:true, data:data};

 }catch (e) {
     return {status:false, error:e};
 }
};


export const addTeamMemberService = async (data) => {
    const { name, position, bio, img } = data;

    // ফর্ম ভ্যালিডেশন সার্ভিসের ভেতরেও রাখা হলো
    if (!name || !position) {
        throw new Error("Name and position are required!");
    }
    const newMember = new TeamModel({ name, position, bio, img });
    return await newMember.save();
};


export const updateTeamMemberService = async (id, data) => {
    return await TeamModel.findByIdAndUpdate
    (id, data, { new: true });
};


export const deleteTeamMemberService = async (id) => {
    return await TeamModel.findByIdAndDelete(id);
};


// export const getActiveTeamMembersService = async () => {
//     return await TeamModel.find({ isActive: true });
// };
