const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Simple validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check for existing user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    await user.save();

    // Start a session for the newly registered user
    req.session.userId = user._id;

    res.status(201).json({
      message: 'User created successfully',
      userId: user._id
    });
  } catch (error) {
    console.error('Registration error:', error); // Log the error to the console for debug purposes.

    // More detailed error message than 'Internal Server Error'
    const errorMessage = error.name === 'ValidationError'
      ? error.message
      : 'Failed to register user due to an unexpected issue.';

    res.status(500).json({ message: errorMessage, error: error.toString() });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    req.session.userId = user._id;

    res.status(200).json({
      message: 'User logged in successfully',
      userId: user._id
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Failed to log in due to an unexpected issue.' });
  }
};
