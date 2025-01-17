import React, { useEffect } from "react";
import ProductsList from "./components/ProductsList";
import SingleProduct from "./components/SingleProduct";
import { Routes, Route, useLocation } from "react-router-dom";
import Cart from "./pages/Cart";
import PaymentPage from "./pages/PaymentPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NotFoundPage from "./pages/NotFoundPage";
import UsersListPage from "./pages/UsersListPage";
import ProductListpage from "./pages/ProductsListPage";
import OrderDetailPage from "./pages/OrderDetailPage";

import { AllProductsPage } from "./pages";

// socket
import socket from "./utils/socket";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProductsAsync, fetchOneProductAsync } from "./store";

const AppRoutes = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { product } = useSelector((state) => state.product);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected");
    });

    socket.on("product/create", (message) => {
      dispatch(fetchAllProductsAsync());
    });

    socket.on("product/edit", (message) => {
      if (
        location.pathname === "/products" ||
        location.pathname === "/admin/products"
      ) {
        dispatch(fetchAllProductsAsync());
      }

      message === product.id && dispatch(fetchOneProductAsync(message));
    });

    socket.on("product/delete", (message) => {
      if (
        location.pathname === "/products" ||
        location.pathname === "/admin/products"
      ) {
        dispatch(fetchAllProductsAsync());
      }
      if (product.id === message) {
        dispatch(fetchOneProductAsync(message));
      }
    });

    return () => {
      socket.off("connect");
      socket.off("product/create");
      socket.off("product/edit");
      socket.off("product/delete");
    };
  }, [product]);

  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={<h1 className="home">Welcome to Future Picassos!</h1>}
        />
        <Route path="/products" element={<AllProductsPage />} />
        <Route path="/products/:productId" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<OrderDetailPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/users" element={<UsersListPage />} />
        <Route path="/admin/products" element={<ProductListpage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  );
};

export default AppRoutes;
