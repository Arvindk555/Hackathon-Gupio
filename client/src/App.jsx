import { NavLink, Routes, Route } from "react-router-dom";
import ProductInventoryPage from "./pages/ProductInventoryPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderListPage from "./pages/OrderListPage";

export default function App() {
  const linkClass = ({ isActive }) =>
    isActive
      ? "px-3 py-1 rounded bg-[#0a1a33] text-white"
      : "px-3 py-1 rounded hover:bg-gray-200";

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      <div className="border-b bg-white shadow-sm">
        <div className="max-w-5xl mx-auto flex justify-between items-center py-4 px-4">
          <h1 className="text-xl font-semibold">Inventory & Order Manager</h1>

          <nav className="flex gap-2">
            <NavLink to="/products" end className={linkClass}>
              Products
            </NavLink>

            <NavLink to="/orders/new" end className={linkClass}>
              Place Order
            </NavLink>

            <NavLink to="/orders" end className={linkClass}>
              Orders
            </NavLink>
          </nav>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-8 px-4">
        <Routes>
          <Route path="/products" element={<ProductInventoryPage />} />
          <Route path="/orders/new" element={<PlaceOrderPage />} />
          <Route path="/orders" element={<OrderListPage />} />
          <Route path="*" element={<ProductInventoryPage />} />
        </Routes>
      </div>
    </div>
  );
}
