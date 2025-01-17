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
import { signup } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const valiate = yup.object({
  name: yup.string("Enter your name").required("Name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(6, "Password should be of mininum 6 characters length")
    .required("Password is required"),
  passwordConfirm: yup
    .string("Enter your password confirm ")
    .oneOf(
      [yup.ref("password"), null],
      "Password and Password Confrom must match"
    )
    .required("Password Confirm is required"),
});

export default function SignupPage() {
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
      dispatch(signup(values));
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
            Sign Up
          </Typography>
          <TextField
            id="name"
            name="name"
            label="Name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
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
          <TextField
            id="passwordConfirm"
            name="passwordConfirm"
            label="Confirm password"
            type="password"
            value={formik.values.passwordConfirm}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.passwordConfirm &&
              Boolean(formik.errors.passwordConfirm)
            }
            helperText={
              formik.touched.passwordConfirm && formik.errors.passwordConfirm
            }
          />
          <Box margin={0} marginTop={2} paddingX={2}>
            <Button color="primary" variant="contained" type="submit" fullWidth>
              <Typography>Sign up</Typography>
            </Button>
          </Box>
          <Typography padding={2}>
            If you already have an account, Let's
            <Link to="/login"> Log in </Link>
          </Typography>
        </Box>
      </form>
    </div>
  );
}
