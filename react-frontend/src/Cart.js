import { useEffect, useContext, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { CartContext } from './Customer';
import {UserContext} from './UserContext';

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
      const response = await axios.post(`http://localhost:8081/cart/${encodedEmail}/checkout`,
        totalCost
    , {
        headers: {
            'Content-Type': 'application/json'
        },
    });
    try {
      setCart([]);
      navigate("/Customer");
      alert('Checkout successful!');
  } catch (error) {
      console.error('An error occurred:', error);
  }
    } catch (ex) {
       alert('Insufficient funds');
    }
  };


  return (
    <div>
      <h2>Cart</h2>
      {cart.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>{product.price}</p>
        </div>
      ))}
      <p>Total: {total}</p>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}

export default Cart;
