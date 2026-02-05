// components/SearchBar.jsx
import { Search, Flame, ShieldCheck } from "lucide-react";

export default function SearchBar({ value, onChange, onSearch, nsfw, setNsfw }) {

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            onSearch();
        }
    };
    return (
        <div className="w-full flex flex-col items-center mt-6 gap-3">
            <div className="relative w-full max-w-4xl group">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search shows..."
                    className="w-full px-5 py-4 pr-32 rounded-2xl bg-slate-800/40 text-slate-100 placeholder-slate-500 border border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:bg-slate-800 transition-all duration-300"
                />

                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <button
                        type="button"
                        onClick={() => setNsfw(!nsfw)}
                        className={`
                            relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl 
                            text-[10px] font-bold tracking-wider transition-all duration-300 active:scale-95
                            border ${nsfw
                                ? "bg-red-500/10 border-red-500/40 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.1)]"
                                : "bg-slate-700/30 border-slate-600/50 text-slate-500 hover:text-slate-300 hover:border-slate-500"
                            }
                        `}
                    >
                        <div className="relative w-3 h-3">
                            {nsfw ?
                                <Flame size={12} className="absolute inset-0 animate-in fade-in zoom-in duration-300" /> :
                                <ShieldCheck size={12} className="absolute inset-0 animate-in fade-in zoom-in duration-300" />
                            }
                        </div>
                        <span className="select-none">NSFW</span>
                    </button>

                    <div className="w-px h-6 bg-slate-700/50 mx-1" />

                    <button
                        type="button"
                        onClick={onSearch}
                        className="text-slate-500 hover:text-indigo-400 p-2 transition-colors"
                    >
                        <Search size={20} />
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-2 overflow-hidden h-4">
                <p className={`text-[9px] uppercase tracking-[0.25em] font-bold transition-all duration-500 ${nsfw ? 'text-red-500/70' : 'text-slate-600'}`}>
                    {nsfw ? "Adult Filters Disabled" : "Strict Safe Search"}
                </p>
            </div>
        </div>
    );
}