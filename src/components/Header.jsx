import { logout, getUser } from "../services/authService";
import {Link} from "react-router-dom"

export default function Header() {
    const user = getUser();

    return (
        <header className="h-14 px-6 flex items-center justify-between
                       bg-slate-800 border-b border-slate-900">
            <Link to="/" className="text-slate-100 font-semibold text-lg">
                IsItOutYet
            </Link>
            <div className="flex items-center gap-4">
                <div
                    title={user?.email}
                    className="w-9 h-9 rounded-full bg-blue-600
                     text-white flex items-center justify-center font-semibold"
                >
                    {user?.email?.[0]?.toUpperCase() || "U"}
                </div>

                <button
                    onClick={logout}
                    className="px-3 py-1.5 text-sm rounded
                     bg-red-900 text-slate-300
                     hover:bg-red-700 hover:text-white transition"
                >
                    Logout
                </button>
            </div>
        </header>
    );
}