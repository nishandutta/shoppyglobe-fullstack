import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productsSlice";
import { Link } from "react-router-dom";
import "./ProductList.css";

export default function ProductList() {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((s) => s.products);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [dispatch, status]);

  if (status === "loading") return <p>Loading products...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  const filteredProducts = list.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="product-list-container">
      <h2>Products</h2>

      {/* 🔍 Search Bar */}
      <div className="product-search">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* No products case */}
      {filteredProducts.length === 0 && (
        <p className="no-products">No products found</p>
      )}

      <div className="product-list-grid">
        {filteredProducts.map((p) => (
          <div key={p._id} className="product-card">
            <h4>{p.name}</h4>
            <p>₹ {p.price}</p>
            <Link to={`/products/${p._id}`} className="view-link">View</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
