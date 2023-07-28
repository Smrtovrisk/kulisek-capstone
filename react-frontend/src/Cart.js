import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from './Customer';
import { UserContext } from './UserContext';

function CartItem({ product }) {
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function Cart() {
  const { cart, setCart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const [total, setTotal] = useState(0);
  let navigate = useNavigate();

  useEffect(() => {
    setTotal(cart.reduce((sum, product) => sum + product.price, 0));
  }, [cart]);

  const handleCheckout = async () => {
    let encodedEmail = encodeURIComponent(user.email);
    let totalCost = total;

    try {
      const response = await axios.post(
        `http://localhost:8081/cart/${encodedEmail}/checkout`,
        totalCost,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      try {
        setCart([]);
        navigate('/Customer');
        alert('Checkout successful!');
      } catch (error) {
        console.error('An error occurred:', error);
      }
    } catch (ex) {
      alert('Insufficient funds');
    }
  };

  return (
    <div className="Cart">
      <h2>Cart</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((product) => (
            <CartItem key={product.id} product={product} />
          ))}
        </tbody>
      </table>
      <p>Total: {total}</p>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}

export default Cart;
