import axios from "axios";

axios.defaults.withCredentials = true;

// export const BASE_API = process.env.REACT_APP_API_BASE_URL;
export const USERS_API = `http://localhost:3000`;

export const signin = async (username: string, password: string) => {
  const response = await axios.post(`${USERS_API}/signin`, {
    username: username,
    password: password,
  });
  return response.data;
};
export const profile = async () => {
  const response = await axios.post(`${USERS_API}/profile`);
  return response.data;
};
export const updateUser = async (user: any) => {
  const response = await axios.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};
export const findAllUsers = async () => {
  const response = await axios.get(`${USERS_API}`);
  return response.data;
};
export const createUser = async (user: any) => {
  const response = await axios.post(`${USERS_API}`, user);
  return response.data;
};
export const deleteUser = async (user: any) => {
  const response = await axios.delete(`${USERS_API}/${user._id}`);
  return response.data;
};
export const signup = async (user: any) => {
  const response = await axios.post(`${USERS_API}/signup`, user);
  return response.data;
};
export const signout = async () => {
  const response = await axios.post(`${USERS_API}/signout`);
  return response.data;
};