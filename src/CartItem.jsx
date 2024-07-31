import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItems = ({ onContinueShopping }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
  
    // Calculate the total cost of all items in the cart
    const calculateTotalAmount = () => {
      return cartItems.reduce((total, item) => total + item.cost * item.quantity, 0).toFixed(2);
    };
  
    // Calculate the total cost for a specific item
    const calculateTotalCost = (item) => {
      return (item.cost * item.quantity).toFixed(2);
    };
  
    // Handle incrementing item quantity
    const handleIncrement = (item) => {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    };
  
    // Handle decrementing item quantity
    const handleDecrement = (item) => {
      if (item.quantity === 1) {
        dispatch(removeItem({ name: item.name }));
      } else {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
      }
    };
  
    // Handle removing an item from the cart
    const handleRemove = (item) => {
      dispatch(removeItem({ name: item.name }));
    };
  
    // Handle continuing shopping
    const handleContinueShopping = () => {
      onContinueShopping();
    };
  
    // Handle checkout (not yet implemented)
    const handleCheckoutShopping = () => {
      alert('Functionality to be added for future reference');
    };
  
    return (
      <div className="cart-items">
        <h1>Shopping Cart</h1>
        <div className="cart-items-list">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.name}>
              <img src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">${item.cost.toFixed(2)}</div>
                <div className="cart-item-quantity">
                  <button onClick={() => handleDecrement(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item)}>+</button>
                </div>
                <div className="cart-item-subtotal">
                  Subtotal: ${calculateTotalCost(item)}
                </div>
                <button onClick={() => handleRemove(item)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <div className="cart-total">
            Total Cost: ${calculateTotalAmount()}
          </div>
          <button onClick={handleContinueShopping}>Continue Shopping</button>
          <button onClick={handleCheckoutShopping}>Checkout</button>
        </div>
      </div>
    );
  };
  
  export default CartItems;
  