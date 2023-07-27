import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CartContext } from './Customer';
import {UserContext} from './UserContext';

function ViewMedicine() {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('http://localhost:8081/products/viewAllProducts');
      setProducts(response.data);
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>View Medicine</h2>
      <input
        type="text"
        placeholder="Filter products"
        value={filter}
        onChange={handleFilterChange}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            {user.type !== 'admin' && <th>Add to cart</th>}
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              {user.type !== 'admin' && (
                <td>
                  <button onClick={() => handleAddToCart(product)}>
                    Add to cart
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewMedicine;
