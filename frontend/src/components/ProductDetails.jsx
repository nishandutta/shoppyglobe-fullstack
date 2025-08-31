import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../redux/slices/productsSlice";
import { addToCart } from "../redux/slices/cartSlice";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "./ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { current, status, error } = useSelector((s) => s.products);
  const { data: cart } = useSelector((s) => s.cart);
  const { isAuthenticated } = useAuth();

  const [qty, setQty] = useState(0); // ✅ start with 0

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch, id]);

  // ✅ Sync with cart if product already exists
  useEffect(() => {
    if (cart?.items) {
      const found = cart.items.find((i) => i.product._id === id);
      if (found) {
        setQty(found.quantity);
      }
    }
  }, [cart, id]);

  const handleGoToCart = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (qty > 0) {
      await dispatch(addToCart({ productId: id, quantity: qty }));
    }
    navigate("/cart");
  };

  if (status === "loading" || !current) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="product-details">
      <h2>{current.name}</h2>
      <p className="price">₹ {current.price}</p>
      <p className="desc">{current.description}</p>
      <p className="stock">In stock: {current.stock}</p>

      {/* Quantity controls */}
      <div className="quantity-container">
        <button
          onClick={() => setQty(Math.max(0, qty - 1))}
          className="qty-btn"
          disabled={qty === 0} // ✅ disable when 0
        >
          -
        </button>
        <span className="qty-display">{qty}</span>
        <button
          onClick={() => setQty(qty + 1)}
          className="qty-btn"
        >
          +
        </button>
      </div>

      <button className="go-cart-btn" onClick={handleGoToCart}>
        Go to Cart
      </button>
    </div>
  );
}
