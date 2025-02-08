import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/helper";

let baseURL = "http://localhost:6060/api";

export const registerOne = async (reqBody) => {
    let result = await axios.post(`${baseURL}/register`, reqBody);
    if (result.data.status === "success") {
        SuccessToast("Register success.");
    } else {
        ErrorToast(result.data.msg);
    }
};

export const apiRequest = async (apiEndPoint, reqBody) => {
    let result = await axios.post(`${baseURL}/${apiEndPoint}`, reqBody);

    return result;
    //   if (result.data.status === "success") {
    //     SuccessToast("Register success.");
    //   } else {
    //     ErrorToast(result.data.msg);
    //   }
};

export const allApiRequest = async (method, apiEndPoint, reqBody) => {
    let rawResponse = await fetch(`${baseURL}/${apiEndPoint}`, {
        method: method,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
    });

    const result = await rawResponse.json();

    console.log(result);

    return result;
    //   if (result.data.status === "success") {
    //     SuccessToast("Register success.");
    //   } else {
    //     ErrorToast(result.data.msg);
    //   }
};
