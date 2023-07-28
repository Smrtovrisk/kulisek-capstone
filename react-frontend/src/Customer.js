// Customer.js
import { useState, createContext, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';

export const CartContext = createContext();

function Customer() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((currentCart) => [...currentCart, product]);
  };

  return (
    <div className="Customer">
      <h2>Welcome to Customer Home Page</h2>
      <Link to="viewMedicine">View Medicine</Link> |
      <Link to="cart">View Cart ({cart.length})</Link> |
      <Link to="/">Logout</Link>
      <hr/>
      <CartContext.Provider value={{ cart,setCart, addToCart }}>
        <Outlet/>
      </CartContext.Provider>
    </div>
  );
}

export default Customer;

