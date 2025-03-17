import { Profile, ProfileIdType } from "app/store/profile-store.types.ts";
import { UseMutationResult } from "react-query";

export interface ManagerTableProp {
  profiles: Profile[];
  isLoading: boolean;
  deleteProfileMutation: UseMutationResult<ProfileIdType, Error, number | string, unknown>;
  updateProfileMutation: UseMutationResult<Profile, Error, Profile, unknown>;
}

export interface ProfileTable extends Pick<Profile, "id" | "name" | "email" | "phone" | "username"> {
  address: string;
  company: string;
}
