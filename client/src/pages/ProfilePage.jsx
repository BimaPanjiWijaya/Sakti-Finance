import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "../components/DashboardLayout";
import {
  UserCircleIcon,
  MapPinIcon,
  BanknotesIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { updateSalary } from "../redux/slices/userSlice";

export default function ProfilePage() {
  const { data: user, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isEditingSalary, setIsEditingSalary] = useState(false);
  const [salaryInput, setSalaryInput] = useState("");
  const [salaryError, setSalaryError] = useState("");
  const [isSavingSalary, setIsSavingSalary] = useState(false);

  useEffect(() => {
    if (user) {
      setSalaryInput(user.salary ?? "");
    }
  }, [user]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!user) {
    return (
      <DashboardLayout>
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
          <p className="text-gray-500 font-medium text-lg">
            Data profil tidak ditemukan.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleEditSalary = () => {
    setIsEditingSalary(true);
    setSalaryError("");
  };

  const handleCancelSalary = () => {
    setIsEditingSalary(false);
    setSalaryInput(user?.salary ?? "");
    setSalaryError("");
  };

  const handleSaveSalary = async () => {
    const numericSalary = Number(salaryInput);
    if (!numericSalary || Number.isNaN(numericSalary) || numericSalary <= 0) {
      setSalaryError("Salary harus angka lebih dari 0.");
      return;
    }

    setIsSavingSalary(true);
    setSalaryError("");
    const result = await dispatch(updateSalary(numericSalary));

    if (updateSalary.fulfilled.match(result)) {
      setIsEditingSalary(false);
    } else {
      setSalaryError(
        result.payload?.message || "Gagal update salary. Coba lagi.",
      );
    }

    setIsSavingSalary(false);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Header Profile */}
        <div className="relative bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
          <div className="px-8 pb-8">
            <div className="relative flex justify-between items-end -mt-12 mb-6">
              <div className="p-2 bg-white rounded-3xl shadow-lg inline-block">
                <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
                  <UserCircleIcon className="w-16 h-16" />
                </div>
              </div>
              <div className="bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-emerald-100 mb-2">
                Active Member
              </div>
            </div>

            <div className="space-y-1">
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                {user.name}
              </h1>
              <div className="flex items-center gap-2 text-gray-500 font-medium">
                <EnvelopeIcon className="w-4 h-4" />
                {user.email}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Financial Info */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                <BanknotesIcon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Financial Info
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-1">
                  Monthly Salary
                </label>
                {!isEditingSalary ? (
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-2xl font-black text-gray-900 leading-none">
                      {formatCurrency(user.salary || 0)}
                    </p>
                    <button
                      type="button"
                      onClick={handleEditSalary}
                      className="px-3 py-1.5 text-xs font-bold uppercase tracking-widest rounded-full border border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
                    >
                      Edit
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <input
                      type="number"
                      min="1"
                      value={salaryInput}
                      onChange={(event) => setSalaryInput(event.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-4 py-2 text-lg font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                      placeholder="Masukkan salary"
                    />
                    {salaryError ? (
                      <p className="text-sm text-rose-500 font-semibold">
                        {salaryError}
                      </p>
                    ) : null}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleSaveSalary}
                        disabled={isSavingSalary}
                        className="px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-full text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60"
                      >
                        {isSavingSalary ? "Saving..." : "Save"}
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelSalary}
                        disabled={isSavingSalary}
                        className="px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-60"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
                <p className="text-sm text-gray-400 mt-2 font-medium">
                  Gaji tetap yang digunakan AI untuk analisis rasio pengeluaran.
                </p>
              </div>
            </div>
          </div>

          {/* Location Info */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <MapPinIcon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Location Details
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-1">
                  Current City
                </label>
                <p className="text-2xl font-black text-gray-900 leading-none flex items-center gap-2">
                  {user.location || "Location not set"}
                </p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <span className="text-[10px] font-bold text-gray-400 block uppercase">
                      Latitude
                    </span>
                    <span className="text-sm font-bold text-gray-700">
                      {user.latitude || "-"}
                    </span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <span className="text-[10px] font-bold text-gray-400 block uppercase">
                      Longitude
                    </span>
                    <span className="text-sm font-bold text-gray-700">
                      {user.longitude || "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security / Account Status */}
        {/* <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
              <span className="text-xl font-bold">#</span>
            </div>
            <div>
              <p className="font-bold text-gray-900">User ID</p>
              <p className="text-sm text-gray-400">
                Unique identifier for your account
              </p>
            </div>
          </div>
          <span className="text-sm font-mono bg-gray-100 px-3 py-1 rounded-lg text-gray-600">
            {user.id}
          </span>
        </div> */}
      </div>
    </DashboardLayout>
  );
}
