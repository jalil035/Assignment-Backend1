import * as teamService from "../service/teamService.js";

export const getAllTeamMembers = async (req, res) => {
    const result = await teamService.getAllTeamMembersService();
    return res.status(200).json(result);

};

export const addTeamMember = async (req, res) => {
    const result = await teamService.addTeamMemberService(req.body);
    return res.status(201).json(result);
};

export const updateTeamMember = async (req, res) => {
    const data =
        await teamService.updateTeamMemberService
        (req.params.id, req.body);
    return res.status(200).json({status: true, data: data, msg:"updated successfully."});
};

export const deleteTeamMember = async (req, res) => {
    const result =
        await teamService.deleteTeamMemberService(req.params.id);
    return res.status(200).json({
        status: true,
        message: "Team member deleted successfully!" });
};

// export const getActiveTeamMembers = async (req, res) => {
//     const result = await teamService.getActiveTeamMembersService();
//     return res.status(200).json(result);
// };
