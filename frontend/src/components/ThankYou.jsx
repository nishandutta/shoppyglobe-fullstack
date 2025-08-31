import React from "react";
import { Link } from "react-router-dom";
import "./ThankYou.css";

export default function ThankYou() {
  return (
    <div className="thankyou-container">
      <div className="thankyou-box">
        <h1>🎉 Thank You for Your Purchase!</h1>
        <p>Your order has been placed successfully.</p>
        <p>We’ll notify you when your items are shipped.</p>

        <Link to="/" className="home-button">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
