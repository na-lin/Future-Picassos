import React, { useEffect } from "react";

// router
import { Navigate } from "react-router-dom";

// components
import ItemsForPayment from "../components/ItemsForPayment";
import OrderDetail from "../components/OrderDetail";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { clearOrder } from "../store/slices/orderSlice";

// MUI
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function OrderDetailPage() {
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.order);

  useEffect(() => {
    return () => {
      dispatch(clearOrder());
    };
  }, []);

  if (!order) {
    return <Navigate to="/cart" />;
  }

  return (
    <Box>
      <Typography variant="h3" sx={{ m: 4 }}>
        Order Detail
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row-reverse",
          },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ItemsForPayment
          cartItems={order.orderItems.map((item) => {
            item = JSON.parse(item);
            return {
              id: item.id,
              imageUrl: item.imageUrl,
              quantity: item.quantity,
              price: item.subtotal / item.quantity,
            };
          })}
          subtotal={order.itemsPrice}
          tax={order.taxPrice}
          shipping={order.shippingPrice}
          total={order.totalPrice}
        />
        <OrderDetail shippingAddress={order.shippingAddress} />
      </Box>
    </Box>
  );
}
