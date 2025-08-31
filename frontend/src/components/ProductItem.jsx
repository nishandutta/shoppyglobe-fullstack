import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import './ProductItem.css';
import { Link } from 'react-router-dom';

export default function ProductItem({ product }) {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) =>
    state.cart.items.find((item) => item.id === product.id)
  );

  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/250x150?text=No+Image';
          }}
        />
      </Link>

      <h3>{product.title}</h3>

      {/* 🆕 Product Description */}
      <p className="product-description">
        {product.description.length > 100
          ? product.description.slice(0, 100) + '...'
          : product.description}
      </p>

      <p className="product-price">${product.price}</p>

      <button onClick={handleAddToCart}>
        {quantity > 0 ? `Added +${quantity}` : 'Add to Cart'}
      </button>
    </div>
  );
}
