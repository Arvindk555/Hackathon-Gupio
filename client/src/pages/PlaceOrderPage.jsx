import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  applyStockChange,
  revertStockChange,
} from "../features/products/productsSlice";
import { createOrder } from "../features/order/ordersSlice.js";


export default function PlaceOrderPage() {
  const dispatch = useDispatch();
  const { items: products } = useSelector((s) => s.products);
  const { creating, error } = useSelector((s) => s.orders);

  const [selected, setSelected] = useState("");
  const [qty, setQty] = useState(1);
  const [cart, setCart] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const addToCart = () => {
    setMsg("");

    if (!selected) return setMsg("Choose a product.");
    if (qty <= 0) return setMsg("Quantity must be at least 1.");

    const p = products.find((x) => x._id === selected);
    if (!p) return;

    const existing = cart.find((x) => x.productId === selected);
    const totalQty = (existing?.qty || 0) + qty;

    if (totalQty > p.stock) {
      return setMsg("Quantity exceeds available stock.");
    }

    if (existing) {
      setCart(
        cart.map((i) =>
          i.productId === selected ? { ...i, qty: totalQty } : i
        )
      );
    } else {
      setCart([...cart, { productId: selected, qty }]);
    }

    setQty(1);
  };

  const removeItem = (id) => {
    setCart(cart.filter((i) => i.productId !== id));
  };

  const placeOrder = async () => {
    if (!cart.length) return;

    dispatch(applyStockChange(cart));

    try {
      await dispatch(createOrder({ items: cart })).unwrap();
      setCart([]);
      setSelected("");
      setQty(1);
      setMsg("Order placed successfully!");
    } catch (err) {
      dispatch(revertStockChange(cart));
      setMsg(err || "Order failed.");
    }
  };

  const total = cart.reduce((sum, i) => {
    const p = products.find((x) => x._id === i.productId);
    return sum + p.price * i.qty;
  }, 0);

  return (
    <div className="space-y-6">
      <section className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-3">Place Order</h2>

        <div className="grid sm:grid-cols-3 gap-3 items-end mb-4">
          <select
            className="border rounded-md px-3 py-2"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="">Choose product</option>
            {products.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name} (stock: {p.stock})
              </option>
            ))}
          </select>

          <input
            type="number"
            className="border rounded-md px-3 py-2"
            min={1}
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
          />

          <button
            onClick={addToCart}
            className="bg-slate-900 text-white py-2 rounded-md hover:bg-slate-800"
          >
            Add
          </button>
        </div>

        {msg && <p className="text-sm text-red-600 mb-2">{msg}</p>}

        {/* Cart */}
        <div className="bg-slate-50 rounded-md p-4">
          <h3 className="font-semibold mb-2">Items</h3>

          {!cart.length && (
            <p className="text-sm text-slate-500">No items added.</p>
          )}

          <div className="space-y-2">
            {cart.map((i) => {
              const p = products.find((x) => x._id === i.productId);

              return (
                <div
                  key={i.productId}
                  className="bg-white border rounded-md p-3 flex justify-between"
                >
                  <div>
                    <div className="font-medium">{p.name}</div>
                    <div className="text-xs text-slate-600">
                      Qty: {i.qty} × ₹{p.price}
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(i.productId)}
                    className="text-red-600 text-xs hover:underline"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between mt-4">
            <span className="text-sm font-medium">Total</span>
            <span className="text-sm font-semibold">₹{total}</span>
          </div>

          <button
            onClick={placeOrder}
            disabled={!cart.length || creating}
            className="mt-4 w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-500 disabled:opacity-50"
          >
            {creating ? "Placing..." : "Place Order"}
          </button>
        </div>
      </section>
    </div>
  );
}
