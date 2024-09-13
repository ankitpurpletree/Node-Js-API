import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Assuming you want to style the components

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch products from the API
    axios.get('http://localhost:4000/products') // Use your API URL
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error fetching products');
        setLoading(false);
      });
  }, []);

  return (
    <div className="app">
      <h1>Product List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.imageUrl} alt={product.name} className="product-image" />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p className="original-price">
                Original Price: <span>${product.price.toFixed(2)}</span>
              </p>
              <p className="discount-percentage">
                Discount: <span>{product.discountPercentage}%</span>
              </p>
              <p className="final-price">
                Final Price: <span>${product.finalPrice}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
