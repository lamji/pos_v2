import { connectToDatabase } from '../../src/common/app/lib/mongodb';
import User from '../../src/common/app/model/Users';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    await connectToDatabase();

    // Extract the token from the Authorization header
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({ success: false, message: 'Token is required' });
    }

    // Decode the JWT token
    const JWT_SECRET_VAL = process.env.JWT_SECRET;
    const decodedToken = jwt.verify(token, JWT_SECRET_VAL);

    if (!decodedToken || !decodedToken.email) {
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }

    const email = decodedToken.email;
    const { items, utangs, transactions } = req.body;

    if (!Array.isArray(items)) {
      return res.status(400).json({ success: false, message: 'Invalid items format' });
    }

    const mappedTransactions = transactions.map((t) => {
      return {
        transactionType: t.type, // Map the transactionType
        items: t.items.map((item) => ({
          id: item._id, // Ensure 'id' is included
          name: item.name, // Ensure 'name' is included
          quantity: item.quantity, // Ensure 'quantity' is included
          price: item.price, // Ensure 'price' is included
          stocks: item.stocks || 0, // Default stocks to 0 if not provided
          type: item.type || 'Cash', // Default to 'Cash' if type is not provided
          date: item.date || new Date(), // Default to current date if not provided
        })),
        cash: t.cash || 0, // Handle missing cash value, default to 0 if not provided
        total: t.total, // Map the total field
        date: t.date || new Date(), // Default date to current date if not provided
        personName: t.transactionType || '', // Ensure personName exists for 'Utang' transactions
        remainingBalance: 0, // Calculate remainingBalance for 'Utang' transactions
        partialAmount: t.partialAmount || 0, // Default partialAmount to 0 if not provided
        change: t.change || 0, // Default change to 0 if not provided
        id: t._id, // Ensure proper use of new ObjectId
      };
    });

    const mappedItems = items?.map((item) => ({
      id: item._id, // Ensure 'id' is included
      name: item.name, // Ensure 'name' is included
      price: item.price, // Ensure 'price' is included
      partial: item.partial || 0, // Default to 0 if not provided
      barcode: item.barcode, // Ensure 'barcode' is included
      quantity: item.quantity || 0, // Default to 0 if not provided
      regularPrice: item.regularPrice || item.price, // Default to 'price' if 'regularPrice' is missing
      date: item.date || new Date(), // Default to current date if not provided
      quantityHistory: item.quantityHistory || [], // Ensure 'quantityHistory' is included, default to an empty array
    }));

    const mappedUtangs = utangs?.map((utang) => ({
      items: utang.items.map((item) => ({
        id: item._id, // Ensure 'id' is included
        name: item.name, // Ensure 'name' is included
        price: item.price, // Ensure 'price' is included
        quantity: item.quantity || 0, // Default to 0 if not provided
        date: item.date || new Date(), // Ensure 'date' is included, default to current date
        isActive: item.isActive !== undefined ? item.isActive : true, // Default to true if not provided
      })),
      personName: utang.personName, // Ensure 'personName' is included
      total: utang.total, // Ensure 'total' is included
      remainingBalance: utang.remainingBalance, // Ensure 'remainingBalance' is included
      transactions: utang.transactions?.map((transaction) => ({
        date: transaction.date || new Date(), // Ensure 'date' is included, default to current date
        amount: transaction.amount || 0, // Default to 0 if not provided
      })),
      date: utang.date || new Date(), // Ensure 'date' is included, default to current date
      id: utang._id, // Ensure proper use of new ObjectId
    }));

    // Update the user in MongoDB
    const updateResult = await User.updateOne(
      { email: email },
      {
        $set: {
          items: mappedItems,
          utangs: mappedUtangs,
          transactions: mappedTransactions,
          backupAt: new Date(),
        },
      }
    );

    if (updateResult.modifiedCount === 0) {
      return res.status(404).json({ success: false, message: 'User not found or no changes made' });
    }

    return res.status(200).json({ success: true, message: 'Items updated successfully' });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update items',
      error: error.message,
      data: error,
    });
  }
}
