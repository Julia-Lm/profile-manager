import { Box, TextField, Button, Stack } from "@mui/material";
import { ProfileFormProp } from "./profile-form.type.ts";
import { useForm } from "react-hook-form";
import { profileSchema } from "./profile-form.constant.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { ProfileFormType } from "app/store/profile-store.types.ts";
import isEqual from "lodash/isEqual";

export const ProfileForm = ({ onSubmit, initialData, onCancel, disabled }: ProfileFormProp) => {
  const [isChanged, setIsChanged] = useState(!Boolean(initialData));

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProfileFormType>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialData || {},
  });

  const onClose = () => {
    onCancel();
    reset();
  };

  const onCreateProfile = async (formData: ProfileFormType) => {
    // const isEqualValues = isEqual(formData, initialData);
    //
    // if (!isEqualValues) await onSubmit(formData);
    await onSubmit(formData);
    onClose();
  };

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);
  const watchedValues = watch();

  useEffect(() => {
    if (initialData) {
      setIsChanged(!isEqual(watchedValues, initialData));
    }
  }, [watchedValues, initialData]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "25px" }}>
      <Stack direction="row" spacing={2}>
        <TextField
          size="small"
          label="Name"
          {...register("name")}
          fullWidth
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          size="small"
          label="Username"
          {...register("username")}
          fullWidth
          error={!!errors.username}
          helperText={errors.username?.message}
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <TextField
          size="small"
          label="Email"
          {...register("email")}
          fullWidth
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          size="small"
          label="Phone"
          {...register("phone")}
          fullWidth
          error={!!errors.phone}
          helperText={errors.phone?.message}
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <TextField
          size="small"
          label="Street"
          {...register("address.street")}
          fullWidth
          error={!!errors.address?.street}
          helperText={errors.address?.street?.message}
        />
        <TextField
          size="small"
          label="Suite"
          {...register("address.suite")}
          fullWidth
          error={!!errors.address?.suite}
          helperText={errors.address?.suite?.message}
        />
        <TextField
          size="small"
          label="City"
          {...register("address.city")}
          fullWidth
          error={!!errors.address?.city}
          helperText={errors.address?.city?.message}
        />
        <TextField
          size="small"
          label="Zipcode"
          {...register("address.zipcode")}
          fullWidth
          error={!!errors.address?.zipcode}
          helperText={errors.address?.zipcode?.message}
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <TextField
          size="small"
          label="Company Name"
          {...register("company.name")}
          fullWidth
          error={!!errors.company?.name}
          helperText={errors.company?.name?.message}
        />
        <TextField
          size="small"
          label="Catch Phrase"
          {...register("company.catchPhrase")}
          fullWidth
          error={!!errors.company?.catchPhrase}
          helperText={errors.company?.catchPhrase?.message}
        />
        <TextField
          size="small"
          label="BS"
          {...register("company.bs")}
          fullWidth
          error={!!errors.company?.bs}
          helperText={errors.company?.bs?.message}
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <Button variant="outlined" color="primary" onClick={onClose} fullWidth>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit(onCreateProfile)}
          fullWidth
          disabled={disabled || !isChanged || isSubmitting}
        >
          {initialData ? "Edit" : "Create"}
        </Button>
      </Stack>
    </Box>
  );
};
