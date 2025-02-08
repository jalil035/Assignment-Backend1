import UserModel from "../model/UserModel.js";
import {EncodeToken} from "../utility/TokenUtility.js";

export const registerService = async (req) => {
    try {
        let reqBody = req.body;
        let existingUser = await UserModel.find({ email: reqBody.email });
        console.log(existingUser);

        if (existingUser.length > 0) {
            return { status: false, msg: "User exist" };
        }

        let data = await UserModel.create(reqBody);
        return { status: true, data: data, msg: "Register success." };
    } catch (e) {
        return { status: false, error: e };
    }
};

export const loginService = async (req,res) => {
    try {
        let exitingUser = await UserModel.findOne({ email: req.body.email });
        if (!exitingUser) {
            return { status: false, msg: "User not found." };
        }

        let reqBody = req.body;
        let data = await UserModel.aggregate([
            { $match: reqBody },
            { $project: { _id: 1, email: 1 } },
        ]);

        if (data.length === 1) {
            let token = EncodeToken(data[0]["email"]);

            // Set cookie
            let options = {
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
                httpOnly: false, // false means allow cookies in all browsers
                sameSite: "none",
                secure: true,
                path:"/"
            };

            res.cookie("token", token, options);
            return {status: true, token: token, data: data[0], msg: "Login success.",};
        } else {
            return { status: false, data: data, msg: "Login un success." };
        }
    } catch (e) {
        return { status: false, error: e.toString(), msg: "Something went wrong." };
    }
};

export const logoutService = async (req,res) => {
    try {
      res.clearCookie("token");
        return { status: true, msg: "logout success." };
    } catch (e) {
        return { status: false, error: e };
        }
  };