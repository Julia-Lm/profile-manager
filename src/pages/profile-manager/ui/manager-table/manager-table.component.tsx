import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ManagerTableProp } from "./manager-table.type.ts";
import { Loader } from "entities/index";
import { Modal } from "shared/ui-kit";
import { useState, useMemo } from "react";
import { ProfileForm } from "features/profile-form";
import { ProfileFormType } from "app/store/profile-store.types.ts";
import { tableCell } from "./manager-table.constants.tsx";
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

  return (
    <>
      <TableContainer component={Paper} sx={{ position: "relative" }}>
        {isLoading && <Loader />}
        <Table>
          <TableHead>
            <TableRow>
              {tableCell.map(({ label, sx }) => (
                <TableCell key={label} sx={sx}>
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.length ? (
              <>
                {tableData.map(({ id, name, username, email, phone, address, company }) => (
                  <TableRow key={id}>
                    <TableCell>{id}</TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell>{username}</TableCell>
                    <TableCell>{email}</TableCell>
                    <TableCell>{phone}</TableCell>
                    <TableCell>{address}</TableCell>
                    <TableCell>{company}</TableCell>
                    <TableCell>
                      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
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
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell colSpan={tableCell.length} style={{ textAlign: "center", minHeight: "53px" }}>
                  No data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
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
