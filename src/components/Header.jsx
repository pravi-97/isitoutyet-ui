import { useState } from "react";
import { logout, getUser } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const user = getUser();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <header className="h-14 px-6 flex items-center justify-between bg-slate-800 border-b border-slate-900">
      <Link to="/" className="text-slate-100 font-semibold text-lg">
        IsItOutYet
      </Link>

      <div
        className="relative"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {/* Avatar */}
        <div
          title={user?.email}
          className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold cursor-pointer"
        >
          {user?.email?.[0]?.toUpperCase() || "U"}
        </div>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-md shadow-lg z-50">
            <div className="px-4 py-2 text-xs text-slate-400 truncate">
              {user?.email}
            </div>

            <button
              onClick={() => navigate("/profile")}
              className="w-full text-left px-4 py-2 text-sm text-slate-200 hover:bg-slate-700"
            >
              Edit Profile
            </button>

            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-900/40"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
