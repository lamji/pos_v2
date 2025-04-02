import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  stocks: { type: Number, required: false }, // ✅ Allow stocks
  type: { type: String, required: false }, // ✅ Allow type
  date: { type: Date, required: false }, // ✅ Allow date
  _rev: { type: String, required: false }, // ✅ Allow _id
});

const transactionSchema = new mongoose.Schema({
  transactionType: { type: String, required: true },
  items: { type: [itemSchema], required: true }, // ✅ Use `itemSchema`
  date: { type: Date, default: Date.now, required: true },
  personName: { type: String, required: false },
  cash: { type: Number, required: false },
  total: { type: Number, required: true },
  remainingBalance: { type: Number, required: false },
  partialAmount: { type: Number, required: false },
  change: { type: Number, required: false },
  id: { type: String, required: true },
  testIid: { type: String, required: true },
  _rev: { type: String, required: false }, // ✅ Allow _id
});

// Auto-calculate remaining balance and change before saving
transactionSchema.pre('save', function (next) {
  if (this.cash) {
    this.change = this.cash - this.total;
  }

  if (this.partialAmount && this.total) {
    this.remainingBalance = this.total - this.partialAmount;
  }

  next();
});

const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);
export default Transaction;
