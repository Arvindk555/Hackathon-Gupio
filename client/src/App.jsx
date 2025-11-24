import { Routes, Route, NavLink } from "react-router-dom";
import ProductInventoryPage from "./pages/ProductInventoryPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderListPage from "./pages/OrderListPage";

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-wrap gap-2 items-center justify-between">
          <h1 className="text-xl font-semibold">Inventory & Order Manager</h1>

          <nav className="flex gap-2 text-sm">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-1 rounded-md border ${
                  isActive
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-800 border-slate-300"
                }`
              }
            >
              Products
            </NavLink>

            <NavLink
              to="/orders/new"
              className={({ isActive }) =>
                `px-3 py-1 rounded-md border ${
                  isActive
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-800 border-slate-300"
                }`
              }
            >
              Place Order
            </NavLink>

            <NavLink
              to="/orders"
              className={({ isActive }) =>
                `px-3 py-1 rounded-md border ${
                  isActive
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-800 border-slate-300"
                }`
              }
            >
              Orders
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<ProductInventoryPage />} />
          <Route path="/orders/new" element={<PlaceOrderPage />} />
          <Route path="/orders" element={<OrderListPage />} />
        </Routes>
      </main>
    </div>
  );
}










/*
export default function App() {
  return (
    <div className="text-4xl text-red-500 font-bold p-5">
      Tailwind is working!
    </div>
  );
}
*/




/*

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App


*/