import axiosInstance from "app/api/axios.ts";
import { requestPostfix } from "../../config.ts";
import { Profile, ProfileIdType } from "app/store/profile-store.types.ts";

export const fetchProfiles = async (): Promise<Profile[]> => {
  const response = await axiosInstance.get(`/${requestPostfix}`);
  return response.data;
};

export const addProfileAPI = async (profile: Profile): Promise<Profile> => {
  const response = await axiosInstance.post(`/${requestPostfix}`, profile);
  return response.data;
};

export const updateProfileAPI = async (profile: Profile): Promise<Profile> => {
  const response = await axiosInstance.put(`/${requestPostfix}/${profile.id}`, profile);
  return response.data;
};

export const deleteProfileAPI = async (id: number | string): Promise<ProfileIdType> => {
  await axiosInstance.delete(`/${requestPostfix}/${id}`);
  return { id };
};
