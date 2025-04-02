import { connectToDatabase } from '../../src/common/app/lib/mongodb';
import User from '../../src/common/app/model/Users';
import { encrypt } from '../../utils/cryptoUtils';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    await connectToDatabase();

    const { code, email } = req.body;

    if (!code || !email) {
      return res.status(400).json({ success: false, message: 'Code and email are required' });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Email already exists' });
    }

    // Encrypt the code (Replace with your actual encryption function)
    const encryptedCode = encrypt(code);

    // Create new user object
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);

    const newUser = new User({
      email,
      subscription: {
        code: encryptedCode,
        isActive: true,
        expiryDate,
      },
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: 'User created and 7-day trial activated',
      expiryDate,
    });
  } catch (error) {
    console.error('Error activating user:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
