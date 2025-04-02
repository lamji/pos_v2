import { connectToDatabase } from '../../src/common/app/lib/mongodb';
import User from '../../src/common/app/model/Users';
import jwt from 'jsonwebtoken'; // Assuming you're using jsonwebtoken to decode tokens

export default async function handler(req, res) {
  const { method } = req;

  // Ensure the correct HTTP method
  if (method !== 'GET') {
    return res.status(405).json({ success: false, message: `Method ${method} Not Allowed` });
  }

  try {
    // Extract the token from the request headers
    const token = req.headers.authorization; // Get token from Bearer header

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Token is required',
      });
    }
    const JWT_SECRET_VAL = process.env.JWT_SECRET;
    // Decode the token (assuming JWT_SECRET_VAL is in your environment variables)
    const decodedToken = jwt.verify(token, JWT_SECRET_VAL);

    if (!decodedToken || !decodedToken.email) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token',
      });
    }

    const email = decodedToken.email;

    // Connect to the MongoDB database
    await connectToDatabase();

    // Access the Users collection
    const collection = await User.findOne({ email }).select('-email -subscription.code -_id');

    if (!collection) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Respond with the retrieved user documents
    return res.status(200).json({
      success: true,
      users: collection,
    });
  } catch (error) {
    // Handle errors
    console.error(error); // Log the error for debugging

    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve user data',
      error: error.message,
    });
  }
}
