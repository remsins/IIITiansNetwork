import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setError("");
    setLoading(true);

    try {
      const res = await api.post("/admin/login", form);
      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin/events", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid credentials. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm">
        {/* Card */}
        <form
          onSubmit={submit}
          className="
            bg-white rounded-2xl
            border border-gray-200
            shadow-sm
            px-8 py-9
            space-y-7
          "
        >
          {/* Header */}
          <div className="text-center space-y-1">
            <span className="inline-block text-[11px] uppercase tracking-widest text-gray-400">
              Restricted
            </span>
            <h1 className="text-2xl font-semibold text-gray-900">
              Admin Login
            </h1>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-100" />

          {/* Error */}
          {error && (
            <div className="
              text-sm text-red-600 text-center
              bg-red-50 border border-red-100
              rounded-lg px-3 py-2
            ">
              {error}
            </div>
          )}

          {/* Inputs */}
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="admin@iiitians.in"
                value={form.email}
                onChange={handleChange}
                disabled={loading}
                required
                className="
                  w-full rounded-lg
                  border border-gray-300
                  px-4 py-2
                  focus:outline-none
                  focus:ring-2 focus:ring-gray-900
                  transition
                  disabled:bg-gray-100
                "
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                disabled={loading}
                required
                className="
                  w-full rounded-lg
                  border border-gray-300
                  px-4 py-2
                  focus:outline-none
                  focus:ring-2 focus:ring-gray-900
                  transition
                  disabled:bg-gray-100
                "
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full rounded-lg
              bg-black text-white
              py-2.5
              font-medium
              tracking-wide
              hover:opacity-90
              transition
              disabled:opacity-50
            "
          >
            {loading ? "Signing in…" : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-4 text-xs text-center text-gray-400">
          Authorized administrators only
        </p>
      </div>
    </div>
  );
}
