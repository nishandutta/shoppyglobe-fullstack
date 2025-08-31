import { Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Checkout from "./components/Checkout";   // ✅ import checkout
import ThankYou from "./components/ThankYou";   // ✅ import thankyou

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        
        {/* protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />  {/* ✅ */}
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* thank you should not require login */}
        <Route path="/thankyou" element={<ThankYou />} />   {/* ✅ */}
      </Routes>
    </div>
  );
}
