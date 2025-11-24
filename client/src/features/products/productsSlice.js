import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axiosClient";

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await api.get("/products");
  return res.data;
});

export const addProduct = createAsyncThunk("products/add", async (body) => {
  const res = await api.post("/products", body);
  return res.data;
});

const slice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    applyStockChange(state, action) {
      action.payload.forEach((i) => {
        const p = state.items.find((x) => x._id === i.productId);
        if (p) p.stock -= i.qty;
      });
    },
    revertStockChange(state, action) {
      action.payload.forEach((i) => {
        const p = state.items.find((x) => x._id === i.productId);
        if (p) p.stock += i.qty;
      });
    },
  },
  extraReducers: (b) => {
    b.addCase(fetchProducts.pending, (s) => {
      s.loading = true;
      s.error = null;
    });
    b.addCase(fetchProducts.fulfilled, (s, a) => {
      s.loading = false;
      s.items = a.payload;
    });
    b.addCase(fetchProducts.rejected, (s, a) => {
      s.loading = false;
      s.error = a.error.message;
    });

    b.addCase(addProduct.fulfilled, (s, a) => {
      s.items.unshift(a.payload);
    });
  },
});

export const { applyStockChange, revertStockChange } = slice.actions;

export default slice.reducer;
