import { useDispatch, useSelector } from "react-redux";
import { Spinner, EmptyState } from "./Feedback";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { deleteTransaction } from "../redux/slices/transactionSlice";

export default function TransactionList({ filter, onEdit }) {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.transaction);

  // Apply filtering logic

  const filteredList = list.filter((item) => {
    if (filter === "all") return true;
    return item.type === filter;
  });

  // Format date helper
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Format currency helper
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading && list.length === 0) {
    return <Spinner />;
  }

  if (filteredList.length === 0) {
    return (
      <EmptyState
        message={
          filter === "all"
            ? "Belum ada transaksi"
            : `Tidak ada data transaksi ${filter}`
        }
        icon={filter === "expense" ? "💸" : "💰"}
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="pb-4 pt-2 font-semibold text-gray-500 text-sm uppercase">
              Date
            </th>
            <th className="pb-4 pt-2 font-semibold text-gray-500 text-sm uppercase">
              Description
            </th>
            <th className="pb-4 pt-2 font-semibold text-gray-500 text-sm uppercase">
              Type
            </th>
            <th className="pb-4 pt-2 font-semibold text-gray-500 text-sm uppercase text-right">
              Amount
            </th>
            <th className="pb-4 pt-2 font-semibold text-gray-500 text-sm uppercase text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {filteredList.map((transaction) => (
            <tr
              key={transaction.id}
              className="group hover:bg-gray-50 transition-colors"
            >
              <td className="py-4 text-gray-600 text-sm">
                {formatDate(transaction.date)}
              </td>
              <td className="py-4">
                <p className="font-semibold text-gray-900">
                  {transaction.description}
                </p>
                <p className="text-xs text-gray-400">ID: #{transaction.id}</p>
              </td>
              <td className="py-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    transaction.type === "income"
                      ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                      : "bg-rose-50 text-rose-600 border border-rose-100"
                  }`}
                >
                  {transaction.type}
                </span>
              </td>
              <td
                className={`py-4 text-right font-bold text-lg ${
                  transaction.type === "income"
                    ? "text-emerald-600"
                    : "text-rose-600"
                }`}
              >
                {transaction.type === "income" ? "+" : "-"}{" "}
                {formatCurrency(transaction.amount)}
              </td>
              <td className="py-4 text-right">
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onEdit(transaction)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                    title="Edit Transaction"
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      if (
                        window.confirm("Are you sure you want to delete this?")
                      ) {
                        dispatch(deleteTransaction(transaction.id));
                      }
                    }}
                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-100"
                    title="Delete Transaction"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
