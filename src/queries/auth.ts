import apiService from "../utils/apiService";

export const loginAccount = async (payload: Record<string, any>) => {
  const { data } = await apiService.post("auth/login", payload);
  return data;
};

export const signup = async (payload: Record<string, any>) => {
  const { data } = await apiService.post("auth/signup", payload);
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await apiService.get("auth/me");
  return data?.user;
};
