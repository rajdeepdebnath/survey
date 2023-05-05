import axios from "axios";
import { UserLogin } from "../type/userLogin";

export const signInApi = async (userLogin: UserLogin): Promise<string> => {
  const response = await axios.post(
    "https://olzl8wq71i.execute-api.ap-south-1.amazonaws.com/prod/user-registration",
    userLogin
  );

  console.log(response);

  return response.data as string;
};
