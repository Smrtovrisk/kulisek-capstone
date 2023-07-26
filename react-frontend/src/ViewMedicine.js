// ViewMedicine.js
import { useState, useEffect } from 'react';
import axios from 'axios';

function ViewMedicine({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('http://localhost:8081/product/viewAllProducts');
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
    product.productName.toLowerCase().includes(filter.toLowerCase())
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
      {filteredProducts.map((product) => (
        <div key={product.productId}>
          <h3>{product.productName}</h3>
          <p>{product.productDescription}</p>
          <button onClick={() => handleAddToCart(product)}>
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default ViewMedicine;
