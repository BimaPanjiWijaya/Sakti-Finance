import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "../components/DashboardLayout";
import TransactionList from "../components/TransactionList";
import TransactionModal from "../components/TransactionModal";
import { fetchTransactions } from "../redux/slices/transactionSlice";
import { PlusIcon } from "@heroicons/react/24/outline";
import { ErrorDisplay } from "../components/Feedback";

export default function TransactionPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [filter, setFilter] = useState("all"); // 'all', 'income', 'expense'

  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.transaction);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const handleOpenAddModal = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (transaction) => {
    setEditData(transaction);
    setIsModalOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header with Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-2xl font-black text-gray-900 leading-tight">
              History Transaksi
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Manage all your financial movements in one place.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Filter Toggle */}
            <div className="bg-gray-100 p-1 rounded-xl flex">
              {["all", "income", "expense"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${
                    filter === f
                      ? "bg-white text-emerald-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <button
              onClick={handleOpenAddModal}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-emerald-100 active:scale-95"
            >
              <PlusIcon className="w-5 h-5" />
              <span>Add Transaction</span>
            </button>
          </div>
        </div>

        {/* List Content */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 min-h-[500px]">
          {error ? (
            <ErrorDisplay
              message={error}
              onRetry={() => dispatch(fetchTransactions())}
            />
          ) : (
            <TransactionList filter={filter} onEdit={handleOpenEditModal} />
          )}
        </div>
      </div>

      {/* Transaction Modal (Add/Edit) */}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editData={editData}
      />
    </DashboardLayout>
  );
}
