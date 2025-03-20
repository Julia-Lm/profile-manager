import { useMutation, useQuery, useQueryClient } from "react-query";
import { useProfileStore } from "app/store/profile-store.ts";
import { addProfileAPI, deleteProfileAPI, fetchProfiles, updateProfileAPI } from "app/api/api.servises.ts";
import { Profile, ProfileIdType } from "app/store/profile-store.types.ts";
import { useEffect, useState } from "react";
import { queryKey } from "../../config.ts";

export const useProfiles = () => {
  const queryClient = useQueryClient();
  const { profiles, setProfiles, addProfile, updateProfile, removeProfile } = useProfileStore();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { data, isLoading, error } = useQuery<Profile[]>(queryKey, fetchProfiles);

  useEffect(() => {
    if (data && !profiles.length) setProfiles(data);
  }, [data]);

  useEffect(() => {
    if (error) setErrorMessage(`Get profile error: ${error}`);
  }, [error]);

  const addProfileMutation = useMutation<Profile, Error, Profile>(addProfileAPI, {
    onSuccess: (newProfile, variables) => {
      addProfile({ ...newProfile, id: variables.id });
      queryClient.invalidateQueries(queryKey);
    },
    onError: (error) => {
      setErrorMessage(`Add profile error: ${error.message}`);
    },
  });

  const updateProfileMutation = useMutation<Profile, Error, Profile>(updateProfileAPI, {
    onSuccess: (updatedProfile) => {
      updateProfile(updatedProfile);
      queryClient.invalidateQueries(queryKey);
    },
    onError: (error) => {
      setErrorMessage(`Update profile error: ${error.message}`);
    },
  });

  const deleteProfileMutation = useMutation<ProfileIdType, Error, number | string>(deleteProfileAPI, {
    onSuccess: (deletedProfile) => {
      removeProfile(deletedProfile.id);
      queryClient.invalidateQueries(queryKey);
    },
    onError: (error) => {
      setErrorMessage(`Delete profile error: ${error.message}`);
    },
  });

  return {
    profiles,
    isLoading:
      isLoading ||
      addProfileMutation.isLoading ||
      updateProfileMutation.isLoading ||
      deleteProfileMutation.isLoading,
    errorMessage,
    setErrorMessage,
    addProfileMutation,
    updateProfileMutation,
    deleteProfileMutation,
  };
};
