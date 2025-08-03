import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ msg: 'User already exists' });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashedPassword, role });
  
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.status(201).json({ token, user: { id: user._id, name: user.name, role: user.role } });
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: 'Invalid credentials' });
  
      if (user.isBanned) {
        return res.status(403).json({ msg: 'Your account has been banned. Please contact support.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
  
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.status(200).json({ token, user: { id: user._id, name: user.name, role: user.role } });
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  };