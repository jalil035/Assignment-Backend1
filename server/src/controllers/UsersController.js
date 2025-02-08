import {loginService, logoutService, registerService} from "../service/UsersService.js";


export const register = async (req, res) => {
  let result = await registerService(req);
  return res.status(200).json(result);
};

export const login = async (req, res) => {
  let result = await loginService(req,res);
  return res.status(200).json(result);
};

export const logout = async (req, res) => {
  let result = await logoutService(req,res);
  return res.status(200).json(result);
};


