
import {contactService} from "../service/contactService.js";

export const contact = async (req, res) => {
    let result = await contactService(req);
    return res.status(200).json(result);
};