import { useState } from "react";
import { logout, getUser } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const user = getUser();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

return (
    <header className="h-16 px-6 flex items-center justify-between bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <Link to="/" className="text-slate-100 font-bold tracking-tighter text-xl">
        IsIt<span className="text-indigo-500">Out</span>Yet
      </Link>

      <div
        className="relative py-2" // Added vertical padding to the wrapper to bridge the gap naturally
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {/* Avatar */}
        <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 text-indigo-400 flex items-center justify-center font-bold cursor-pointer hover:border-indigo-500/50 transition-colors">
          {user?.email?.[0]?.toUpperCase() || "U"}
        </div>

        {/* Dropdown */}
        <div
          className={`absolute right-0 top-full w-56 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden
            transition-all duration-200 transform
            ${open ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"}`}
        >
          <div className="px-4 py-3 border-b border-slate-700/50">
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Account</p>
            <p className="text-sm text-slate-200 truncate font-medium">{user?.email}</p>
          </div>

          <div className="p-1">
            <button
              onClick={() => navigate("/profile")}
              className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white rounded-lg transition-colors"
            >
              Edit Profile
            </button>

            <button
              onClick={logout}
              className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}