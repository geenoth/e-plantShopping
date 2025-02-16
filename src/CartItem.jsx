import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      total += item.quantity * parseFloat(item.cost.substring(1));
    });
    return total.toFixed(2);
  };

  // Calculate total cost for an individual item
  const calculateTotalCost = (item) => {
    let totalCost = 0;
    const itemCost = parseItemCostToInteger(item.cost);
    totalCost = item.quantity * itemCost;

    return totalCost;
};

  // Handle continue shopping
  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  // Handle increment quantity
  const handleIncrement = (item) => {
    const updatedItem = { ...item };
    updatedItem.quantity++;
    dispatch(updateQuantity(updatedItem));
};

  // Handle decrement quantity
  const handleDecrement = (item) => {
    const updatedItem = { ...item };
    if (updatedItem.quantity == 1) {
        dispatch(removeItem(updatedItem));
    } else {
        updatedItem.quantity--;
        dispatch(updateQuantity(updatedItem));
    }
};

  // Handle remove item from cart
  const handleRemove = (item) => {
    dispatch(removeItem(item));
};

  // Handle checkout (future implementation)
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
