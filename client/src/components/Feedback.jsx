export function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-slate-500 font-medium animate-pulse">
        Memuat data...
      </p>
    </div>
  );
}

export function ErrorDisplay({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-red-50 rounded-2xl border border-red-100">
      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 text-red-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-bold text-red-800 tracking-tight">
        Terjadi Kesalahan
      </h3>
      <p className="text-red-600 text-center mt-1 mb-6 max-w-sm">
        {message || "Gagal memuat data. Silakan coba lagi."}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-red-200"
        >
          Coba Lagi
        </button>
      )}
    </div>
  );
}

export function EmptyState({ message, icon }) {
  return (
    <div className="flex flex-col items-center justify-center p-16 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
      <div className="text-5xl mb-4 grayscale opacity-50">{icon || "💸"}</div>
      <p className="text-slate-500 font-medium text-lg text-center">
        {message || "Belum ada data tersedia"}
      </p>
    </div>
  );
}
