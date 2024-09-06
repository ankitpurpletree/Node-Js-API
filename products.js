const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON requests

const PORT = process.env.PORT || 3000;

// Dummy product data (replace with real data or a database in a real project)
const products = [
  {
    id: 1,
    name: 'Product 1',
    description: 'This is the description for product 1',
    price: 99.99,
    imageUrl: 'https://via.placeholder.com/150'
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'This is the description for product 2',
    price: 149.99,
    imageUrl: 'https://via.placeholder.com/150'
  },
  {
    id: 3,
    name: 'Product 3',
    description: 'This is the description for product 3',
    price: 199.99,
    imageUrl: 'https://via.placeholder.com/150'
  },
  {
    id: 4,
    name: 'Product 4',
    description: 'This is the description for product 4',
    price: 249.99,
    imageUrl: 'https://via.placeholder.com/150'
  }
];

// GET all products
app.get('/products', (req, res) => {
  res.status(200).json(products);
});

// GET product by ID
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.status(200).json(product);
});

// POST create a new product (for testing purposes)
app.post('/products', (req, res) => {
  const { name, description, price, imageUrl } = req.body;

  // Validation: Check if all fields are provided
  if (!name || !description || !price || !imageUrl) {
    return res.status(400).json({ error: 'Please provide all product details' });
  }

  const newProduct = {
    id: products.length + 1, // Generate a new ID based on length
    name,
    description,
    price,
    imageUrl
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// DELETE a product by ID
app.delete('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  products.splice(productIndex, 1);
  res.status(200).json({ message: 'Product deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});
