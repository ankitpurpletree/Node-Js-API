// const express = require('express');
// const app = express();

// app.use(express.json()); // Middleware to parse JSON requests

// const PORT = process.env.PORT || 3000;

// // Dummy product data
// const products = [
//   { id: 1, name: 'Product 1', price: 99.99 },
//   { id: 2, name: 'Product 2', price: 149.99 },
//   { id: 3, name: 'Product 3', price: 199.99 },
// ];

// // In-memory cart to store items
// let cart = [];

// // 1. Create: Add item to the cart
// app.post('/cart', (req, res) => {
//   const { productId, quantity } = req.body;

//   if (!productId || !quantity) {
//     return res.status(400).json({ error: 'Please provide productId and quantity.' });
//   }

//   const product = products.find(p => p.id === productId);

//   if (!product) {
//     return res.status(404).json({ error: 'Product not found' });
//   }

//   const cartItem = cart.find(item => item.productId === productId);

//   if (cartItem) {
//     cartItem.quantity += quantity;
//   } else {
//     cart.push({ productId, quantity });
//   }

//   res.status(201).json({ message: 'Item added to cart', cart });
// });

// // 2. Read: Get all items in the cart
// app.get('/cart', (req, res) => {
//   if (cart.length === 0) {
//     return res.status(200).json({ message: 'Cart is empty' });
//   }

//   const cartDetails = cart.map(item => {
//     const product = products.find(p => p.id === item.productId);
//     return {
//       productId: item.productId,
//       name: product.name,
//       price: product.price,
//       quantity: item.quantity,
//       total: product.price * item.quantity
//     };
//   });

//   res.status(200).json(cartDetails);
// });

// // 3. Update: Update quantity of an item in the cart
// app.put('/cart/:productId', (req, res) => {
//   const productId = parseInt(req.params.productId);
//   const { quantity } = req.body;

//   const cartItem = cart.find(item => item.productId === productId);

//   if (!cartItem) {
//     return res.status(404).json({ error: 'Product not found in the cart' });
//   }

//   cartItem.quantity = quantity;

//   res.status(200).json({ message: 'Cart updated', cart });
// });

// // 4. Delete: Remove an item from the cart
// app.delete('/cart/:productId', (req, res) => {
//   const productId = parseInt(req.params.productId);

//   cart = cart.filter(item => item.productId !== productId);

//   res.status(200).json({ message: 'Item removed from cart', cart });
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is listening on PORT: ${PORT}`);
// });



const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON requests

const PORT = process.env.PORT || 3000;

// Dummy product data (in a real app, this would come from a database)
const products = [
  { id: 1, name: 'Product 1', price: 99.99 },
  { id: 2, name: 'Product 2', price: 149.99 },
  { id: 3, name: 'Product 3', price: 199.99 },
];

// In-memory cart data (this would be user-specific in a real app)
let cart = [];

// Helper function to find a product by ID
const findProductById = (productId) => products.find(p => p.id === productId);

// Helper function to find a cart item by product ID
const findCartItemByProductId = (productId) => cart.find(item => item.productId === productId);

// Helper function to calculate total price of an item in cart
const calculateTotalPrice = (product, quantity) => (product.price * quantity).toFixed(2);

// Helper function to return structured cart details
const getCartDetails = () => {
  return cart.map(item => {
    const product = findProductById(item.productId);
    return {
      productId: item.productId,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
      total: calculateTotalPrice(product, item.quantity)
    };
  });
};

// 1. Create: Add item to the cart
app.post('/cart', (req, res) => {
  const { productId, quantity } = req.body;

  // Validate inputs
  if (!productId || !quantity || quantity <= 0) {
    return res.status(400).json({ error: 'Please provide a valid productId and quantity.' });
  }

  const product = findProductById(productId);
  if (!product) {
    return res.status(404).json({ error: 'Product not found.' });
  }

  const cartItem = findCartItemByProductId(productId);
  if (cartItem) {
    // Update quantity if the item is already in the cart
    cartItem.quantity += quantity;
  } else {
    // Add new item to the cart
    cart.push({ productId, quantity });
  }

  return res.status(201).json({ message: 'Item added to cart', cart: getCartDetails() });
});

// 2. Read: Get all items in the cart
app.get('/cart', (req, res) => {
  if (cart.length === 0) {
    return res.status(200).json({ message: 'Cart is empty' });
  }
  return res.status(200).json({ cart: getCartDetails() });
});

// 3. Update: Update quantity of an item in the cart
app.put('/cart/:productId', (req, res) => {
  const productId = parseInt(req.params.productId);
  const { quantity } = req.body;

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ error: 'Please provide a valid quantity.' });
  }

  const cartItem = findCartItemByProductId(productId);
  if (!cartItem) {
    return res.status(404).json({ error: 'Product not found in the cart.' });
  }

  // Update quantity
  cartItem.quantity = quantity;
  return res.status(200).json({ message: 'Cart updated', cart: getCartDetails() });
});

// 4. Delete: Remove an item from the cart
app.delete('/cart/:productId', (req, res) => {
  const productId = parseInt(req.params.productId);

  const cartItemIndex = cart.findIndex(item => item.productId === productId);
  if (cartItemIndex === -1) {
    return res.status(404).json({ error: 'Product not found in the cart.' });
  }

  // Remove item from the cart
  cart.splice(cartItemIndex, 1);
  return res.status(200).json({ message: 'Item removed from cart', cart: getCartDetails() });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});
