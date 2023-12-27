const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Failed to get user details' });
  }
};

exports.updateUserDetails = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const updates = {
      firstName,
      lastName,
      email
    };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updates.password = hashedPassword;
    }
    const user = await User.findByIdAndUpdate(req.session.userId, updates, { new: true }).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error updating user details:', error);
    res.status(500).json({ message: 'Failed to update user details' });
  }
};
