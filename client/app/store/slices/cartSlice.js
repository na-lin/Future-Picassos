import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";
import { logout } from "./authSlice";

/*
to consider:
Your application may have multiple API requests, and you may want to set request headers for all of them. Instead of adding the headers to each request, you can put them as default headers, and they will apply to all the requests. To do so, use the defaults.headers property of the axios object.
https://rapidapi.com/guides/request-headers-axios
*/

export const fetchUserCart = createAsyncThunk(
  "cart/fetchUserCart",
  async (_, { dispatch }) => {
    try {
      const token = JSON.parse(localStorage.getItem("jwt"));
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`/api/cart`, config);
      const cartArr = data.cartDetails.map((prod) => {
        return {
          id: prod.productInfo.id,
          imageUrl: prod.productInfo.imageUrl,
          price: prod.productInfo.price,
          title: prod.productInfo.title,
          quantity: prod.quantity,
        };
      });
      return cartArr;
    } catch (err) {
      if (err) {
        console.log(err);
        // logout user once the token has expired.
        dispatch(logout());
      }
    }
  }
);

export const addToCartDB = createAsyncThunk(
  "cart/addToCartDB",
  async (newCartEntry) => {
    try {
      const token = JSON.parse(localStorage.getItem("jwt"));
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post("/api/cart", newCartEntry, config);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const deleteFromCartDB = createAsyncThunk(
  "cart/deleteFromCartDB",
  async (toDelete) => {
    try {
      const token = JSON.parse(localStorage.getItem("jwt"));
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: toDelete,
      };
      await axios.delete("/api/cart", config);
      return { productId: toDelete.id };
    } catch (err) {
      console.error(err);
    }
  }
);

export const editCartDB = createAsyncThunk(
  "/cart/editCartDB",
  async (toEdit) => {
    try {
      const token = JSON.parse(localStorage.getItem("jwt"));
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put("/api/cart", toEdit, config);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: { cartItems: [] },
  reducers: {
    addToCart: (state, action) => {
      //check if exist in cart
      const itemExists = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      //if not, push to array
      if (!itemExists) {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      } else {
        const updatedCart = state.cartItems.map((prod) => {
          if (prod.id === action.payload.id) {
            prod.quantity++;
            return prod;
          } else {
            return prod;
          }
        });
        state.cartItems = updatedCart;
      }
      //if so, map to increase quantity
    },
    deleteProduct: (state, action) => {
      const remainingItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      state.cartItems = remainingItems;
    },
    incrementOne: (state, action) => {
      const product = state.cartItems.filter(
        (item) => item.id === action.payload
      )[0];
      product.quantity++;
    },
    subtractOne: (state, action) => {
      const product = state.cartItems.filter(
        (item) => item.id === action.payload
      )[0];
      if (product.quantity > 1) {
        product.quantity--;
      }
    },
    //@desc: pull cart from localstorage and set as cart in state
    getLocalCart: (state, action) => {
      let cart;
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      if (cart) {
        state.cartItems = cart;
      } else {
        state.cartItems = [];
      }
    },

    setLocalCart: (state, action) => {
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserCart.fulfilled, (state, action) => {
      state.cartItems = action.payload;
    });
    builder.addCase(addToCartDB.fulfilled, (state, action) => {
      // state.cartItems.push(action.payload);
      console.log("item added to cart db");
    });
    builder.addCase(deleteFromCartDB.fulfilled, (state, action) => {
      console.log("db updated!");
      // return {
      //   cartItems: state.cartItems.filter(
      //     (product) => product.productId !== action.payload
      //   ),
      // };
    });
    builder.addCase(editCartDB.fulfilled, (state, action) => {
      // return action.payload;
    });
  },
});

export const selectCart = (state) => state.cart;
export const {
  addToCart,
  deleteProduct,
  incrementOne,
  subtractOne,
  getLocalCart,
  setLocalCart,
} = cartSlice.actions;
export default cartSlice.reducer;
