// Cart.js
import { useState, useEffect } from 'react';
import axios from 'axios';

function Cart({ cart }) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(cart.reduce((sum, product) => sum + product.price, 0));
  }, [cart]);

  const handleCheckout = async () => {
    try {
      const response = await axios.post('http://localhost:8081/shoppingCart/checkout', cart);
      console.log(response.data);
      if (response.data === 'Checkout successful') {
        alert('Checkout successful!');
      } else {
        alert('Insufficient funds');
      }
    } catch (ex) {
      console.error(ex);
    }
  };

  return (
    <div>
      <h2>Cart</h2>
      {cart.map((product) => (
        <div key={product.productId}>
          <h3>{product.productName}</h3>
          <p>{product.productDescription}</p>
          <p>{product.price}</p>
        </div>
      ))}
      <p>Total: {total}</p>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}

export default Cart;
