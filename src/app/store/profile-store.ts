import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Profile, ProfileState } from "app/store/profile-store.types.ts";
import { storageName } from "../../config.ts";

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profiles: [],
      setProfiles: (profiles: Profile[]) => set({ profiles }),
      addProfile: (profile: Profile) => set((state) => ({ profiles: [...state.profiles, profile] })),
      updateProfile: (updatedProfile: Profile) =>
        set((state) => ({
          profiles: state.profiles.map((profile) =>
            profile.id === updatedProfile.id ? updatedProfile : profile,
          ),
        })),
      removeProfile: (id: number | string) =>
        set((state) => ({
          profiles: state.profiles.filter((profile) => profile.id !== id),
        })),
    }),
    {
      name: storageName,
    },
  ),
);
