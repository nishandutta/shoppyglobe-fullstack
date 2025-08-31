import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart, decreaseQuantity } from '../redux/cartSlice';
import './CartItem.css';

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="cart-item">
      <img src={item.thumbnail} alt={item.title} />

      <div className="cart-details">
        <h4 className="cart-title">{item.title}</h4>

        <div className="cart-info-row">
          <p className="cart-price">
            ${item.price} x {item.quantity} = ${item.price * item.quantity}
          </p>

          <div className="cart-buttons">
            <button onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
            <button onClick={() => dispatch(addToCart(item))}>+</button>
            <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
}
