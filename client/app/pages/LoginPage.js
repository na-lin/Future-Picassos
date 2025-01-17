import React, { useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { login } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const valiate = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(6, "Password should be of mininum 6 characters length")
    .required("Password is required"),
});

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, user, error } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: valiate,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div>
      <Backdrop
        open={isLoading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {!isLoading && error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={formik.handleSubmit}>
        <Box display={"flex"} flexDirection={"column"} paddingX={8}>
          <Typography variant="h3" marginBottom={4} textAlign={"center"}>
            Log In
          </Typography>
          <TextField
            id="email"
            name="email"
            label="Email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Box margin={0} paddingX={2}>
            <Button color="primary" variant="contained" type="submit" fullWidth>
              <Typography>Sign in</Typography>
            </Button>
          </Box>
          <Typography padding={2}>
            If you haven't an account, please
            <Link to="/signup"> sign up </Link>first
          </Typography>
        </Box>
      </form>
    </div>
  );
}
