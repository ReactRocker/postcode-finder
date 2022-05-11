import React from "react";
import { Box, TextField, Typography, Button, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLoadingStatus,
  selectAuthorized,
  selectInfo,
} from "../../redux/authSlice";

import { signIn } from "../../redux/thunks/authThunk";

export default function AuthComp() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoadingStatus);
  const info = useSelector(selectInfo);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    dispatch(signIn(data));
  };
  return (
    <Box
      component="form"
      sx={{
        p: 2.5,
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h5" sx={{ mb: 1 }}>
        Sign In
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          "&>*": {
            mb: 1.5,
          },
        }}
      >
        <TextField
          error={errors?.username || null}
          label="Username"
          type="text"
          variant="standard"
          {...register("username", {
            required: "Field is required",
          })}
          helperText={errors?.["username"]?.message || false}
        />
        <TextField
          error={errors?.password || null}
          label="Password"
          type="password"
          variant="standard"
          {...register("password", {
            required: "Field is required",
          })}
          helperText={errors?.["password"]?.message || false}
        />
      </Box>
      {info ? (
        <Alert sx={{ mb: 1 }} severity="error">
          {info}!
        </Alert>
      ) : null}
      <LoadingButton loading={loading} variant="outlined" type="submit">
        Submit
      </LoadingButton>
    </Box>
  );
}
