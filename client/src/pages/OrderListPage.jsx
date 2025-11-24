import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../features/order/ordersSlice";

export default function OrderListPage() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((s) => s.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <section className="bg-white p-5 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-3">Orders</h2>

      {loading && <p className="text-sm text-slate-500">Loading...</p>}

      <div className="space-y-3">
        {items.map((o) => (
          <div key={o._id} className="border rounded-md p-4 bg-slate-50">
            <div className="flex justify-between mb-1">
              <span className="font-medium">Order #{o._id}</span>

              <span className="text-xs px-2 py-1 rounded-md bg-emerald-100 text-emerald-600">
                {o.status}
              </span>
            </div>

            <div className="text-xs text-slate-500 mb-2">
              {new Date(o.createdAt).toLocaleString()}
            </div>

            <ul className="text-sm mb-2">
              {o.items.map((i, idx) => (
                <li key={idx}>
                  {i.productId?.name} × {i.qty}
                </li>
              ))}
            </ul>

            <div className="font-semibold">Total: ₹{o.totalAmount}</div>
          </div>
        ))}

        {!items.length && !loading && (
          <p className="text-sm text-slate-500 text-center">
            No orders placed yet.
          </p>
        )}
      </div>
    </section>
  );
}
