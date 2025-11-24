import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axiosClient";

export const fetchOrders = createAsyncThunk("orders/fetch", async () => {
  const res = await api.get("/orders");
  return res.data;
});

export const createOrder = createAsyncThunk(
  "orders/create",
  async (body, { rejectWithValue }) => {
    try {
      const res = await api.post("/orders", body);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Order creation failed"
      );
    }
  }
);

const slice = createSlice({
  name: "orders",
  initialState: {
    items: [],
    loading: false,
    creating: false,
    error: null,
  },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchOrders.pending, (s) => {
      s.loading = true;
      s.error = null;
    });
    b.addCase(fetchOrders.fulfilled, (s, a) => {
      s.loading = false;
      s.items = a.payload;
    });
    b.addCase(fetchOrders.rejected, (s, a) => {
      s.loading = false;
      s.error = a.error.message;
    });

    b.addCase(createOrder.pending, (s) => {
      s.creating = true;
      s.error = null;
    });
    b.addCase(createOrder.fulfilled, (s, a) => {
      s.creating = false;
      s.items.unshift(a.payload);
    });
    b.addCase(createOrder.rejected, (s, a) => {
      s.creating = false;
      s.error = a.payload || "Failed to create order";
    });
  },
});

export default slice.reducer;
