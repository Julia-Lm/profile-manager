import { PageLayout } from "widgets/page-layout";
import { ManagerTable } from "pages/profile-manager/ui";
import { useProfiles } from "shared/hooks/useProfiles.ts";
import { Box, Button, Typography } from "@mui/material";
import { Modal } from "shared/ui-kit";
import { useState } from "react";
import { ProfileForm } from "features/index";
import { ProfileFormType } from "app/store/profile-store.types.ts";
import { customAlphabet } from "nanoid";
import { SnackbarMessage } from "entities/index";

const generateNumericId = customAlphabet("0123456789", 4);

export const ProfileManager = () => {
  const [openModal, setOpenModal] = useState(false);
  const {
    profiles,
    isLoading,
    errorMessage,
    setErrorMessage,
    addProfileMutation,
    deleteProfileMutation,
    updateProfileMutation,
  } = useProfiles();

  const openModalForm = () => setOpenModal(true);
  const closeModalForm = () => setOpenModal(false);

  const onCreateProfile = async (formData: ProfileFormType) => {
    const randomId = generateNumericId();
    addProfileMutation.mutate({ ...formData, id: randomId });
  };

  const handleCloseSnackbar = () => {
    setErrorMessage(null);
  };

  return (
    <PageLayout>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: "20px" }}>
        <Typography variant="h5">Profiles Table</Typography>
        <Button variant="contained" color="primary" onClick={openModalForm}>
          Add New Profile
        </Button>
        <Modal open={openModal} onClose={closeModalForm} title="Create Profile">
          <ProfileForm
            onSubmit={onCreateProfile}
            onCancel={closeModalForm}
            disabled={addProfileMutation.isLoading}
          />
        </Modal>
      </Box>
      <ManagerTable
        profiles={profiles}
        isLoading={isLoading}
        deleteProfileMutation={deleteProfileMutation}
        updateProfileMutation={updateProfileMutation}
      />
      <SnackbarMessage
        open={Boolean(errorMessage)}
        severity="error"
        message={errorMessage}
        onClose={handleCloseSnackbar}
      />
    </PageLayout>
  );
};
