import React, { useEffect } from "react";
// import PaymentForm from "../components/PaymentForm";
// import CartList from "../components/CartList";
// import { selectCart } from "../store/slices/cartSlice";
// import { clearOrder } from "../store/slices/orderSlice";
// import { Box, Grid, Typography, Alert, AlertTitle } from "@mui/material";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import { Link } from "react-router-dom";

// MUI
import Box from "@mui/material/Box";

// Components
import ItemsForPayment from "../components/ItemsForPayment";
import PaymentForm from "../components/PaymentForm";

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUserCart,
  getLocalCart,
  selectCart,
} from "../store/slices/cartSlice";

export default function PaymentPage() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector(selectCart);
  const { user } = useSelector((state) => state.auth);
  const subtotal = cartItems
    .reduce(
      (sum, currentItem) => sum + currentItem.price * currentItem.quantity,
      0
    )
    .toFixed(2);
  const shipping = (cartItems.length ? 5 : 0).toFixed(2);
  const tax = ((parseFloat(subtotal) + parseFloat(shipping)) * 0.0425).toFixed(
    2
  );
  const total = (
    parseFloat(subtotal) +
    parseFloat(shipping) +
    parseFloat(tax)
  ).toFixed(2);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserCart());
    } else {
      dispatch(getLocalCart());
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column-reverse",
          sm: "column-reverse",
          md: "row",
        },
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ flexGrow: 1, mr: 4 }}>
        <PaymentForm
          orderItem={cartItems}
          subtotal={subtotal}
          tax={tax}
          shipping={shipping}
          total={total}
        />
      </Box>
      <ItemsForPayment
        cartItems={cartItems}
        subtotal={subtotal}
        tax={tax}
        shipping={shipping}
        total={total}
      />
    </Box>
  );
}

/*
export default function PaymentPage() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector(selectCart);
  const { order } = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(clearOrder());
  }, []);

  const subtotal = cartItems
    .reduce(
      (sum, currentItem) => sum + currentItem.price * currentItem.quantity,
      0
    )
    .toFixed(2);
  const shipping = (cartItems.length ? 5 : 0).toFixed(2);
  const tax = ((parseFloat(subtotal) + parseFloat(shipping)) * 0.0425).toFixed(
    2
  );
  const total = (
    parseFloat(subtotal) +
    parseFloat(shipping) +
    parseFloat(tax)
  ).toFixed(2);

  const orderItems = cartItems.map((item) => {
    return item.id;
  });

  if (order) {
    return (
      <Alert severity="success" sx={{ mt: 2 }}>
        <AlertTitle sx={{ fontSize: 40 }}>
          You have successfully place this order!
        </AlertTitle>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link to={"/products"}>
            <Typography variant="subtitle1" sx={{ mr: 2 }}>
              There are other wonderful artist waiting for you, Let's Go to see
              it!
            </Typography>
          </Link>
          <Link to={"/products"}>
            <ArrowForwardIcon />
          </Link>
        </Box>
      </Alert>
    );
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <div>{<CartList />}</div>
          <p>subtotal: ${subtotal}</p>
          <p>shipping: ${shipping}</p>
          <p>tax: ${tax}</p>
          <p>order total: ${total}</p>
        </Grid>
        <Grid item xs={12}>
          <PaymentForm
            itemsPrice={subtotal}
            taxPrice={tax}
            shippingPrice={shipping}
            totalPrice={total}
            orderItems={orderItems}
          />
        </Grid>
      </Grid>
    </>
  );
}
*/
