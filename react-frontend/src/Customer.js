// Customer.js
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

function Customer() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((currentCart) => [...currentCart, product]);
  };

  return (
    <div>
      <h2>Welcome to Customer Home Page</h2>
      <Link to="viewMedicine">View Medicine</Link> |
      <Link to="cart">View Cart ({cart.length})</Link> |
      <Link to="/">Logout</Link>
      <hr/>
      <Outlet addToCart={addToCart}/>
    </div>
  );
}

export default Customer;
