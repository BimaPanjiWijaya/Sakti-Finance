import { useSelector } from "react-redux";
import {
  SparklesIcon,
  LightBulbIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { Spinner, ErrorDisplay, EmptyState } from "./Feedback";

export default function InsightCard() {
  const { data, loading, error } = useSelector((state) => state.insight);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorDisplay message={error?.message || error} />;
  }

  // Handle case where data might be an array (history) or single object
  const insight = Array.isArray(data) ? data[0] : data;

  if (!insight) {
    return (
      <EmptyState
        message="Belum ada analisa AI. Klik 'Regenerate' untuk memulai!"
        icon="🤖"
      />
    );
  }

  // Map database fields to UI terms
  const displayScore = insight.spending_score || 0;
  const displayStatus = insight.status || "UNKNOWN";
  const displayRecommendation = insight.recommendation || "-";
  const displaySummary =
    insight.summary || "Analisa keuangan Anda sedang diproses.";

  // Dynamic Color Logic
  const getScoreColor = (score) => {
    if (score <= 40)
      return {
        bg: "bg-rose-500",
        text: "text-rose-600",
        ring: "ring-rose-200",
        light: "bg-rose-50",
      };
    if (score <= 70)
      return {
        bg: "bg-amber-500",
        text: "text-amber-600",
        ring: "ring-amber-200",
        light: "bg-amber-50",
      };
    return {
      bg: "bg-emerald-500",
      text: "text-emerald-600",
      ring: "ring-emerald-200",
      light: "bg-emerald-50",
    };
  };

  const colors = getScoreColor(displayScore);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden text-left">
        {/* Header Section with Score */}
        <div className="p-8 border-b border-gray-50 bg-gradient-to-br from-white to-gray-50/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2 text-emerald-600 font-bold uppercase tracking-wider text-xs">
                <SparklesIcon className="w-4 h-4" />
                <span>Gemini AI Financial Score</span>
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-2">
                Your Health Status:{" "}
                <span className={colors.text}>{displayStatus}</span>
              </h2>
              <p className="text-gray-500 max-w-lg leading-relaxed font-medium">
                Analisis berdasarkan profil gaji dan riwayat transaksi terbaru
                Anda.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div
                className={`w-24 h-24 rounded-full border-8 border-gray-100 flex items-center justify-center relative`}
              >
                <span className={`text-3xl font-black ${colors.text}`}>
                  {displayScore}
                </span>
                <div
                  className={`absolute -bottom-2 px-3 py-1 ${colors.bg} text-white text-[10px] font-bold rounded-full uppercase tracking-tighter`}
                >
                  POINTS
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-8">
            <div className="flex justify-between text-xs font-bold text-gray-400 mb-2 px-1">
              <span>POOR</span>
              <span>OKAY</span>
              <span>EXCELLENT</span>
            </div>
            <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden p-1 shadow-inner">
              <div
                className={`h-full rounded-full ${colors.bg} transition-all duration-1000 shadow-sm`}
                style={{ width: `${displayScore}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Summary */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <ShieldCheckIcon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 text-xl">
                Financial Summary
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed italic bg-blue-50/30 p-5 rounded-2xl border border-blue-50">
              "{displaySummary}"
            </p>
          </div>

          {/* Recommendation */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                <LightBulbIcon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 text-xl">
                AI Recommendation
              </h3>
            </div>
            <div
              className={`p-5 rounded-2xl border ${colors.ring.replace("ring", "border")} ${colors.light}`}
            >
              <div className="text-gray-700 font-medium leading-relaxed whitespace-pre-line">
                {displayRecommendation}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
