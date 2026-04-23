import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTransaction,
  updateTransaction,
  fetchTransactions,
} from "../redux/slices/transactionSlice";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function TransactionModal({ isOpen, onClose, editData = null }) {
  const [formData, setFormData] = useState({
    type: "expense",
    amount: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [formError, setFormError] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.transaction);

  useEffect(() => {
    if (editData) {
      setFormData({
        type: editData.type,
        amount: editData.amount,
        description: editData.description,
        date: editData.date.split("T")[0],
      });
    } else {
      setFormData({
        type: "expense",
        amount: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
      });
    }
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!formData.amount || formData.amount <= 0) {
      setFormError("Amount must be greater than 0");
      return;
    }

    if (!formData.description.trim()) {
      setFormError("Description is required");
      return;
    }

    const payload = {
      ...formData,
      amount: Number(formData.amount),
    };

    let result;
    if (editData) {
      result = await dispatch(updateTransaction({ id: editData.id, payload }));
    } else {
      result = await dispatch(addTransaction(payload));
    }

    if (!result.error) {
      onClose();
      dispatch(fetchTransactions());
    } else {
      setFormError(result.payload?.message || "Failed to process transaction");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            {editData ? "Edit Transaction" : "Add New Transaction"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {formError && (
            <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 italic">
              ⚠️ {formError}
            </div>
          )}

          {/* Type Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Transaction Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all bg-white"
            >
              <option value="income">Income (Pemasukan)</option>
              <option value="expense">Expense (Pengeluaran)</option>
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Amount (Rp)
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="e.g. 50000"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="e.g. Weekly Groceries"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 text-white font-black py-4 rounded-2xl shadow-lg shadow-emerald-100 transition-all active:scale-95"
            >
              {loading
                ? "Processing..."
                : editData
                  ? "Update Transaction"
                  : "Save Transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
