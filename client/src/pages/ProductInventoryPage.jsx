import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, addProduct } from "../features/products/productsSlice";

export default function ProductInventoryPage() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((s) => s.products);

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const submit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.stock) return;

    await dispatch(
      addProduct({
        name: form.name,
        price: Number(form.price),
        stock: Number(form.stock),
        category: form.category,
      })
    );

    setForm({ name: "", price: "", stock: "", category: "" });
  };

  return (
    <div className="space-y-6">
      {/* Add Product */}
      <section className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-3">Add Product</h2>

        <form
          className="grid sm:grid-cols-4 gap-3 items-end"
          onSubmit={submit}
        >
          <input
            className="border rounded-md px-3 py-2 text-sm"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="border rounded-md px-3 py-2 text-sm"
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <input
            className="border rounded-md px-3 py-2 text-sm"
            placeholder="Stock"
            type="number"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
          />

          <input
            className="border rounded-md px-3 py-2 text-sm"
            placeholder="Category (optional)"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />

          <button className="bg-slate-900 text-white py-2 rounded-md text-sm hover:bg-slate-800">
            Add
          </button>
        </form>
      </section>

      {/* Product List */}
      <section className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-3">Product Inventory</h2>

        {loading && <p className="text-sm text-slate-500">Loading...</p>}

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Name</th>
                <th className="text-right p-2">Price</th>
                <th className="text-right p-2">Stock</th>
                <th className="text-left p-2">Category</th>
                <th className="text-left p-2">Status</th>
              </tr>
            </thead>

            <tbody>
              {items.map((p) => {
                const low = p.stock <= 5;

                return (
                  <tr key={p._id} className="border-b">
                    <td className="p-2 font-medium">{p.name}</td>
                    <td className="p-2 text-right">₹{p.price}</td>
                    <td className="p-2 text-right">{p.stock}</td>
                    <td className="p-2">
                      {p.category || <span className="text-slate-400">—</span>}
                    </td>
                    <td className="p-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-md ${
                          low
                            ? "bg-red-100 text-red-600"
                            : "bg-emerald-100 text-emerald-600"
                        }`}
                      >
                        {low ? "Low Stock" : "Available"}
                      </span>
                    </td>
                  </tr>
                );
              })}

              {items.length === 0 && !loading && (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-slate-500">
                    No products yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
