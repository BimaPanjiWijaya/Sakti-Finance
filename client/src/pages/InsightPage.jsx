import { useEffect } from "react";
import { useDispatch } from "react-redux";
import DashboardLayout from "../components/DashboardLayout";
import InsightCard from "../components/InsightCard";
import { fetchInsight, generateInsight } from "../redux/slices/insightSlice";

export default function InsightPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInsight());
  }, [dispatch]);

  const handleGenerate = () => {
    dispatch(generateInsight());
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-2xl font-black text-gray-900 leading-tight">
              AI Financial Insights
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Smart advice powered by Google Gemini AI.
            </p>
          </div>
          <button
            onClick={handleGenerate}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-lg active:scale-95"
          >
            Regenerate Analysis
          </button>
        </div>

        <InsightCard />

        <div className="bg-gradient-to-br from-indigo-500/5 to-purple-600/5 p-10 rounded-3xl border border-indigo-100 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-white shadow-md rounded-2xl flex items-center justify-center mb-4">
            <span className="text-3xl text-indigo-500">🛡️</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            How it works?
          </h3>
          <p className="text-gray-500 max-w-lg leading-relaxed">
            Gemini AI analyzes your fixed salary against your spending habits
            and geolocation context to calculate a unique financial health score
            and practical suggestions for your next steps.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
