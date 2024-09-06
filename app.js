const express = require('express');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken
const app = express();

app.use(express.json()); // Middleware to parse JSON requests

const PORT = process.env.PORT || 3000;
const SECRET_KEY = '1234'; // Replace with your own secret key

// Registration endpoint
app.post('/register', (request, response) => {
  // Extract registration details from the request body
  let { name, email, password } = request.body;

  // Use dummy data if the fields are missing or incomplete
  if (!name || !email || !password) {
    name = name || 'Ankit';
    email = email || 'test@gmail.com';
    password = password || '1234';
  }

  // Create a user object
  const user = {
    name,
    email,
    password,
  };

  // Generate a token
  const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' }); // Token expires in 1 hour

  // Respond with user data and token
  const userData = {
    name,
    email,
    password,
    message: 'User registered successfully!',
    token, // Include the token in the response
  };

  response.status(201).json(userData);
});

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});
