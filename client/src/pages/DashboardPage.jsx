import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "../components/DashboardLayout";
import SummaryCards from "../components/SummaryCards";
import InsightCard from "../components/InsightCard";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { fetchTransactions } from "../redux/slices/transactionSlice";
import { fetchInsight, generateInsight } from "../redux/slices/insightSlice";
import { fetchUserProfile } from "../redux/slices/userSlice";
import { Spinner, ErrorDisplay } from "../components/Feedback";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { loading: transLoading, error: transError } = useSelector(
    (state) => state.transaction,
  );
  const { loading: insightLoading, error: insightError } = useSelector(
    (state) => state.insight,
  );

  const handleRetry = () => {
    dispatch(fetchTransactions());
    dispatch(fetchInsight());
    dispatch(fetchUserProfile());
  };

  const handleGenerate = () => {
    dispatch(generateInsight());
  };

  useEffect(() => {
    handleRetry();
  }, [dispatch]);

  const isLoading = transLoading || insightLoading;
  const isError = transError || insightError;

  const errorMessage =
    (transError && typeof transError === "object"
      ? transError.message
      : transError) ||
    (insightError && typeof insightError === "object"
      ? insightError.message
      : insightError);

  return (
    <DashboardLayout>
      {/* Header Section */}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Real-time summary of your financial status.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleRetry}
            className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold text-sm shadow-sm hover:bg-gray-50 transition-all flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 text-emerald-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
            Refresh
          </button>
          <button
            onClick={handleGenerate}
            disabled={insightLoading}
            className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold text-sm shadow-sm hover:bg-emerald-700 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <SparklesIcon className="w-4 h-4" />
            {insightLoading ? "Analyzing..." : "Analyze Now"}
          </button>
        </div>
      </div>

      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <ErrorDisplay message={errorMessage} onRetry={handleRetry} />
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {/* 📊 Summary Cards (Income, Expense, Balance) */}
          <SummaryCards />

          {/* ✨ AI Insight Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-gray-900">
                Personalized AI Analysis
              </h2>
              <div className="h-px flex-1 bg-gray-100"></div>
              <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">
                Live
              </span>
            </div>
            <InsightCard />
          </div>

          {/* Side panels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 min-h-[250px] flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-md font-bold text-gray-900">
                Spending Analysis
              </h3>
              <p className="text-gray-400 text-sm max-w-xs mt-1">
                Charts will appear once you have more data.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 min-h-[250px] flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-md font-bold text-gray-900">
                Historical Insights
              </h3>
              <p className="text-gray-400 text-sm max-w-xs mt-1">
                Recommendations based on your unique habits.
              </p>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
