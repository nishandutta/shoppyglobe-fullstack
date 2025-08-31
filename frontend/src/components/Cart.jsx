import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateCart, fetchCart } from "../redux/slices/cartSlice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";

export default function Cart() {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((s) => s.cart);

  useEffect(() => {
    dispatch(fetchCart());   // 🔑 always sync from backend
  }, [dispatch]);

  if (status === "loading") return <p>Updating cart...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!data || !data.items?.length) return <p>Your cart is empty.</p>;

  const total = data.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: 16 }}>
      <h2>Your Cart</h2>
      {data.items.map((item) => (
        <CartRow
          key={item.product._id}
          item={item}
          onUpdate={(q) =>
            dispatch(updateCart({ productId: item.product._id, quantity: q }))
          }
          onRemove={() => dispatch(removeFromCart(item.product._id))}
        />
      ))}

      <div
        style={{
          marginTop: 20,
          paddingTop: 12,
          borderTop: "2px solid #ccc",
          textAlign: "right",
        }}
      >
        <div style={{ fontWeight: "bold", fontSize: "18px", marginBottom: 12 }}>
          Total: ₹{total.toLocaleString("en-IN")}
        </div>
        <Link
          to="/checkout"
          style={{
            background: "#007bff",
            color: "white",
            padding: "10px 20px",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Proceed to Checkout →
        </Link>
      </div>
    </div>
  );
}

function CartRow({ item, onUpdate, onRemove }) {
  const [localQty, setLocalQty] = useState(item.quantity);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 0",
        borderBottom: "1px solid #eee",
      }}
    >
      <div style={{ flex: 2 }}>
        <strong>{item.product.name}</strong>
        <div style={{ fontSize: 14, color: "#666" }}>₹{item.product.price}</div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <button
          onClick={() => {
            const newQty = Math.max(1, localQty - 1);
            setLocalQty(newQty);
            onUpdate(newQty);
          }}
          style={{ padding: "4px 8px" }}
        >
          -
        </button>
        <input
          type="number"
          min={1}
          value={localQty}
          onChange={(e) => {
            const newQty = Math.max(1, Number(e.target.value));
            setLocalQty(newQty);
          }}
          style={{ width: 50, textAlign: "center" }}
        />
        <button
          onClick={() => {
            const newQty = localQty + 1;
            setLocalQty(newQty);
            onUpdate(newQty);
          }}
          style={{ padding: "4px 8px" }}
        >
          +
        </button>
      </div>

      <div>
        <button
          onClick={onRemove}
          style={{
            marginLeft: 12,
            background: "red",
            color: "white",
            border: "none",
            padding: "6px 12px",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
