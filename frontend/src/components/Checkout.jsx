import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/slices/cartSlice";
import "./Checkout.css";

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartData = useSelector((state) => state.cart.data);

  // Fallback if no cart or items
  if (!cartData || !cartData.items || cartData.items.length === 0) {
    return (
      <div className="checkout-container">
        <h2>Checkout</h2>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  const { items } = cartData;
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handlePay = async () => {
  try {
    await dispatch(clearCart()).unwrap();
    await dispatch(fetchCart()).unwrap();  //  ensures Redux is fresh
    navigate("/thankyou");
  } catch (err) {
    console.error("Failed to clear cart:", err);
    alert("Something went wrong while processing payment.");
  }
};

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <table className="checkout-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.product._id}>
              <td>{item.product.name}</td>
              <td>{item.quantity}</td>
              <td>₹{item.product.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2" style={{ textAlign: "right" }}>
              <strong>Total:</strong>
            </td>
            <td>
              <strong>₹{total}</strong>
            </td>
          </tr>
        </tfoot>
      </table>
      <div className="pay-button-container">
        <button onClick={handlePay}>Pay</button>
      </div>
    </div>
  );
}
