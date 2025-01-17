import React, { useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Alert,
  Backdrop,
  CircularProgress,
  TextField,
  Button,
} from "@mui/material";

import { Field, useFormik } from "formik";
import * as yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import { fetchOneProductAsync, editExistedProduct } from "../store";

const validate = yup.object({
  title: yup
    .string("Enter title of product")
    .required("Title of product is required."),
  imageUrl: yup
    .string("Enter Imgae URL of product.")
    .required("Image URL of product is required."),
  price: yup
    .number("Price must be a decimal number.")
    .required("Price of product is required."),
  description: yup.string("Enter description of product"),
  artistName: yup.string("Enter name of artist"),
  age: yup.number("Enter age of artist."),
  countInStock: yup.number("Enter count in stock of product."),
});

export default function EditProduct({ handleClose, open, id }) {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchOneProductAsync(id));
  }, []);

  const formik = useFormik({
    initialValues: {
      title: product.title || "",
      imageUrl: product.imageUrl || "",
      price: product.price || 0,
      description: product.description || "",
      artistName: product.artistName || "",
      age: product.age || 0,
      countInStock: product.countInStock || 0,
    },
    enableReinitialize: true,
    validationSchema: validate,
    onSubmit: (values) => {
      dispatch(
        editExistedProduct({
          id: id,
          product: values,
        })
      );
      handleClose();
    },
  });

  return (
    <Box>
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
            fontSize: {
              xs: 24,
              md: 46,
            },
            textAlign: "center",
            pb: 0,
          }}
        >
          Update product
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <Box display={"flex"} flexDirection={"column"}>
              <TextField
                fullWidth
                id="title"
                name="title"
                label="title"
                type="text"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
              <TextField
                fullWidth
                id="imageUrl"
                name="imageUrl"
                label="Image URL"
                type="text"
                value={formik.values.imageUrl}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.imageUrl && Boolean(formik.errors.imageUrl)
                }
                helperText={formik.touched.imageUrl && formik.errors.imageUrl}
              />
              <TextField
                fullWidth
                multiline
                rows={4}
                id="description"
                placeholder="description"
                name="description"
                label="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
              <TextField
                fullWidth
                id="price"
                name="price"
                label="Price"
                type="number"
                inputProps={{
                  step: 0.01,
                }}
                value={formik.values.price === 0 ? "" : formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
              />
              <TextField
                fullWidth
                id="artistName"
                name="artistName"
                label="Artist Name"
                type="text"
                value={formik.values.artistName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.artistName && Boolean(formik.errors.artistName)
                }
                helperText={
                  formik.touched.artistName && formik.errors.artistName
                }
              />
              <TextField
                fullWidth
                id="age"
                name="age"
                label="age"
                type="number"
                value={formik.values.age === 0 ? "" : formik.values.age}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.age && Boolean(formik.errors.age)}
                helperText={formik.touched.age && formik.errors.age}
              />
              <TextField
                fullWidth
                id="countInStock"
                name="countInStock"
                label="Count In Stock"
                type="number"
                value={
                  formik.values.countInStock === 0
                    ? ""
                    : formik.values.countInStock
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.countInStock &&
                  Boolean(formik.errors.countInStock)
                }
                helperText={
                  formik.touched.countInStock && formik.errors.countInStock
                }
              />
            </Box>
          </DialogContent>
          <DialogActions
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "space-between",
              px: 5,
            }}
          >
            <Button type="submit" variant="contained">
              Update
            </Button>
            <Button onClick={handleClose} variant="contained" color="error">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
