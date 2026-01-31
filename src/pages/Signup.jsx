import { useState } from "react";
import { signup } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signup(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-sm bg-slate-800 border border-slate-700 rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <h1 className="text-xl font-semibold text-white mb-6">
            Create an account
          </h1>

          {error && (
            <p className="mb-4 text-sm text-red-500">
              {error}
            </p>
          )}

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-slate-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full rounded-md bg-slate-900 border border-slate-700 text-white px-3 py-2 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="example@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-slate-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full rounded-md bg-slate-900 border border-slate-700 text-white px-3 py-2 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-slate-900 font-medium py-2.5 rounded-md mb-4 transition"
          >
            Create Account
          </button>

          <p className="text-xs text-slate-400 text-center">
            By continuing, you agree to our{" "}
            <span
              onClick={() => navigate("/terms-and-privacy")}
              className="text-green-400 cursor-pointer hover:underline"
            >
              Terms of Service
            </span>{" "}
            and{" "}
            <span
              onClick={() => navigate("/terms-and-privacy")}
              className="text-green-400 cursor-pointer hover:underline"
            >
              Privacy Policy
            </span>.
          </p>
          <p className="text-sm text-slate-400 text-center space-x-2">
            <span>
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-green-400 cursor-pointer hover:underline"
              >
                Sign in
              </span>
            </span>
          </p>

        </form>
      </div>
    </div>
  );
}