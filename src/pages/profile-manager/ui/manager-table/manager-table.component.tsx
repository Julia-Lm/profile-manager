import { Button, Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ManagerTableProp } from "./manager-table.type.ts";
import { Modal } from "shared/ui-kit";
import { useState, useMemo } from "react";
import { ProfileForm } from "features/profile-form";
import { ProfileFormType } from "app/store/profile-store.types.ts";
import { getProfileTableData } from "pages/profile-manager/ui/manager-table/utils.ts";

export const ManagerTable = ({
  profiles,
  isLoading,
  deleteProfileMutation,
  updateProfileMutation,
}: ManagerTableProp) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectProfileID, setSelectProfileID] = useState<number | string | null>(null);
  const selectProfileData = useMemo(
    () => profiles.find((profile) => profile.id === selectProfileID),
    [profiles, selectProfileID],
  );

  const openModalForm = () => setOpenModal(true);
  const closeModalForm = () => setOpenModal(false);

  const handleEdit = (id: number | string) => () => {
    setSelectProfileID(id);
    openModalForm();
  };

  const onUpdatedProfile = async (formData: ProfileFormType) => {
    if (!selectProfileID) return;
    updateProfileMutation.mutate({ ...formData, id: selectProfileID });
  };

  const handleDelete = (id: number | string) => async () => {
    setSelectProfileID(id);
    deleteProfileMutation.mutate(id);
  };

  const tableData = getProfileTableData(profiles);

  const baseColumnsSettings: Pick<GridColDef, "filterable" | "sortable" | "editable" | "disableColumnMenu" | "resizable"> = {
    filterable: false, sortable: false, editable: false, disableColumnMenu: true, resizable: false
  }

  const tableColumns: GridColDef[] = [
    { field: "id", headerName: "ID", ...baseColumnsSettings },
    { field: "name", headerName: "Name", ...baseColumnsSettings },
    { field: "username", headerName: "Username", ...baseColumnsSettings },
    { field: "email", headerName: "Email", width: 220, ...baseColumnsSettings },
    { field: "phone", headerName: "Phone", width: 150, ...baseColumnsSettings },
    { field: "address", headerName: "Address", width: 170, ...baseColumnsSettings },
    { field: "company", headerName: "Company", width: 150, ...baseColumnsSettings },
    {
      field: "actions",
      headerName: "Actions",
      width: 160,
      ...baseColumnsSettings,
      headerAlign: "center",
      type: "actions",
      renderCell: ({ id }) => (
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px", height: "100%" }}>
          <Button variant="text" color="secondary" onClick={handleEdit(id)}>
            <EditIcon />
          </Button>
          <Button
            variant="text"
            color="error"
            onClick={handleDelete(id)}
            disabled={deleteProfileMutation.isLoading && id === selectProfileID}
          >
            <DeleteIcon />
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <>
      <DataGrid
        rows={tableData}
        columns={tableColumns}
        loading={isLoading}
        pageSizeOptions={[10]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
      />
      <Modal open={openModal} onClose={closeModalForm} title="Edit Profile">
        <ProfileForm
          onSubmit={onUpdatedProfile}
          onCancel={closeModalForm}
          initialData={selectProfileData}
          disabled={updateProfileMutation.isLoading}
        />
      </Modal>
    </>
  );
};
