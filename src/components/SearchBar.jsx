// components/SearchBar.jsx
import { Search } from "lucide-react";

export default function SearchBar({ value, onChange, onSearch }) {
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            onSearch();
        }
    };

    return (
        <div className="w-full flex justify-center mt-6">
            <div className="relative w-full max-w-4xl">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search shows..."
                    className="
            w-full px-5 py-3 pr-12
            rounded-xl
            bg-slate-800
            text-slate-100
            placeholder-slate-400
            border border-slate-700
            focus:outline-none
            focus:ring-2
            focus:ring-blue-600
          "
                />

                <button
                    type="button"
                    onClick={onSearch}
                    className="
            absolute right-3 top-1/2 -translate-y-1/2
            text-slate-400 hover:text-white transition
          "
                >
                    <Search size={20} />
                </button>
            </div>
        </div>
    );
}