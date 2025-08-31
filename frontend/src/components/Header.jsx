import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "./Header.css";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="header">
      <h1>
        <Link to="/" className="logo-link">ShoppyGlobe</Link>
      </h1>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/checkout">Checkout</Link>
        {!isAuthenticated ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button className="logout-btn" onClick={logout}>Logout</button>
        )}
      </nav>
    </header>
  );
}
