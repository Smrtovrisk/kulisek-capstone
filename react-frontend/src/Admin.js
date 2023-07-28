// Admin.js
import {Link, Outlet} from 'react-router-dom';
import { useState, createContext, useContext } from 'react';
import { CartContext } from './Customer'; // Import context from Customer component file

function Admin() {

    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
      setCart((currentCart) => [...currentCart, product]);
    };

    return(
        <div className="Admin">
            <h2>Welcome to Admin Home Page</h2>
            <Link to="addMedicine">Add Medicine</Link> |
            <Link to="viewMedicine">View Medicine</Link> |
            <Link to="/">Logout</Link>
            <hr/>
            <CartContext.Provider value={{ cart,setCart, addToCart }}>
        <Outlet/>
      </CartContext.Provider>
        </div>
    )
}

export default Admin;
