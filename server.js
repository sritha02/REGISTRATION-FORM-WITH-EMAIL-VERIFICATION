// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3001;

// Replace with your database setup (SQL or MongoDB)
const users = [];

app.use(bodyParser.json());

// Registration endpoint
app.post('/register', (req, res) => {
  const { name, email, phoneNumber } = req.body;

  // Simple validation, you should add more robust validation
  if (!name || !email || !phoneNumber) {
    return res.status(400).json({ error: 'All fields are mandatory' });
  }

  // Store user in the database
  users.push({ name, email, phoneNumber });

  // Send verification mail (you would use a real mail service in production)

  // Respond with success message
  res.json({ message: 'Registration successful. Check your email for verification.' });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { email } = req.body;

  // Check if the user is registered
  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(404).json({ error: 'User is not registered' });
  }

  // Send welcome message
  res.json({ message: `Welcome ${user.name}` });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
