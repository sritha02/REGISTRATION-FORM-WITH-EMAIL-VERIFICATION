// server.js
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const app = express();
const PORT = 3001;

// Replace with your MongoDB setup
const mongoose = require('mongoose');
mongoose.connect('mongodb://your-mongodb-connection-string/your-database', { useNewUrlParser: true, useUnifiedTopology: true });

// User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNumber: String,
  password: String,
  activationToken: String,
  activated: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());

// Registration endpoint
app.post('/register', async (req, res) => {
  const { name, email, phoneNumber } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const password = crypto.randomBytes(8).toString('hex');
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate activation token
    const activationToken = crypto.randomBytes(16).toString('hex');

    // Store user in the database
    const newUser = new User({ name, email, phoneNumber, password: hashedPassword, activationToken });
    await newUser.save();

    // Send activation email (replace with a real email service)
    const transporter = nodemailer.createTransport({
      // configure nodemailer with your email service
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
      },
    });

    const activationLink = `http://localhost:3001/activate/${activationToken}`;
    await transporter.sendMail({
      to: email,
      subject: 'Activate Your Account',
      text: `Click the following link to activate your account: ${activationLink}`,
    });

    // Respond with success message
    res.json({ message: 'Registration successful. Check your email for activation.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error during registration' });
  }
});

// Activation endpoint
app.get('/activate/:token', async (req, res) => {
  const { token } = req.params;

  try {
    // Find user with the given activation token
    const user = await User.findOne({ activationToken: token });

    if (!user) {
      return res.status(404).json({ error: 'Invalid activation token or user not found' });
    }

    // Activate the user
    user.activated = true;
    user.activationToken = null;
    await user.save();

    res.json({ message: 'Account activated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error during activation' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user is registered
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.activated) {
      return res.status(401).json({ error: 'Account not activated. Check your email for activation instructions.' });
    }

    // Check the password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Send welcome message
    res.json({ message: `Welcome ${user.name}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error during login' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

