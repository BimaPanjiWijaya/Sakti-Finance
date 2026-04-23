import { useSelector } from "react-redux";
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  WalletIcon,
} from "@heroicons/react/24/solid";

export default function SummaryCards() {
  const { list } = useSelector((state) => state.transaction);
  const { data: user } = useSelector((state) => state.user);

  // Calculate totals
  const summary = list.reduce(
    (acc, transaction) => {
      const amount = Number(transaction.amount) || 0;
      if (transaction.type === "income") {
        acc.income += amount;
      } else if (transaction.type === "expense") {
        acc.expense += amount;
      }
      return acc;
    },
    { income: 0, expense: 0 },
  );

  const initialSalary = Number(user?.salary) || 0;
  const balance = initialSalary + summary.income - summary.expense;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const cards = [
    {
      title: "Total Income",
      value: summary.income,
      icon: ArrowTrendingUpIcon,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-100",
    },
    {
      title: "Total Expense",
      value: summary.expense,
      icon: ArrowTrendingDownIcon,
      color: "text-rose-600",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-100",
    },
    {
      title: "Monthly Salary",
      value: initialSalary,
      icon: WalletIcon,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-100",
    },
    {
      title: "Remaining Balance",
      value: balance,
      icon: WalletIcon,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-2xl shadow-sm hover:shadow-md p-6 border border-gray-100 transition-all duration-300"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-tight mb-1">
                {card.title}
              </p>
              <h3 className={`text-xl font-black ${card.color}`}>
                {formatCurrency(card.value)}
              </h3>
            </div>
            <div className={`p-2.5 rounded-xl ${card.bgColor}`}>
              <card.icon className={`w-5 h-5 ${card.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
