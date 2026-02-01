import { useState } from "react";
import { login, loginWithGoogle } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password); // email verification handled in service
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };



  const handleGoogleLogin = async () => {
    setError("");

    try {
      await loginWithGoogle();
      navigate("/");
    } catch (err) {
      setError(err.message || "Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-sm bg-slate-800 border border-slate-700 rounded-lg shadow-md p-6">
        <form onSubmit={handleLogin}>
          <h1 className="text-xl font-semibold text-white mb-6">
            Sign in to your account
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
            className="w-full bg-green-500 hover:bg-green-600 text-slate-900 font-medium py-2.5 rounded-md mb-3 transition"
          >
            Login
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full border border-slate-700 text-slate-200 hover:bg-slate-700 py-2.5 rounded-md mb-4 transition"
          >
            Continue with Google
          </button>
          <p className="text-xs text-slate-400 text-center">
            By continuing, you agree to our{" "}
            <span
              onClick={() => navigate("/terms-and-privacy#terms_of_service")}
              className="text-green-400 cursor-pointer hover:underline"
            >
              Terms of Service
            </span>{" "}
            and{" "}
            <span
              onClick={() => navigate("/terms-and-privacy#privacy_policy")}
              className="text-green-400 cursor-pointer hover:underline"
            >
              Privacy Policy
            </span>.
          </p>


          <p className="text-sm text-slate-400 text-center">
            Not registered?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-green-400 cursor-pointer hover:underline"
            >
              Create account
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}