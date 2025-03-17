import { Profile, ProfileFormType } from "app/store/profile-store.types.ts";

export interface ProfileFormProp {
  onSubmit: (data: ProfileFormType) => Promise<void>;
  onCancel: () => void;
  initialData?: Profile;
  disabled?: boolean;
}
