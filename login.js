const express = require('express');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken
const app = express();

app.use(express.json()); // Middleware to parse JSON requests

const PORT = process.env.PORT || 3000;
const SECRET_KEY = '1234'; // Replace with your own secret key

// Dummy user data for testing
const dummyUser = {
  name: 'Ankit', // Add name to the dummy user
  email: 'test@gmail.com',
  password: '1234'
};

// Login endpoint
app.post('/login', (request, response) => {
  // Extract login details from the request body
  const { email, password } = request.body;

  // Check if email and password are provided
  if (!email || !password) {
    return response.status(400).json({ error: 'Please provide both email and password.' });
  }

  // Check if the provided email and password match the dummy user data
  if (email === dummyUser.email && password === dummyUser.password) {
    // Generate a token (expires in 1 hour)
    const token = jwt.sign(
      { email: dummyUser.email, name: dummyUser.name }, 
      SECRET_KEY, 
      { expiresIn: '1h' }
    );

    // Respond with a success message and the token
    return response.status(200).json({
      message: 'Login successful!',
      token: token
    });
  } else {
    // If the credentials don't match, return an error
    return response.status(401).json({ error: 'Invalid email or password.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});
