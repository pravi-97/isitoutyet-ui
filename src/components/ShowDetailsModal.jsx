import { useEffect, useState } from "react";
import { getShowById, trackNewShowDefault } from "../api/showApi";
import "./styles/ShowDetailsModal.css";
import { useMyShowIds } from "../context/AppContext";
import toast from "react-hot-toast";
import { Send, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

export default function ShowDetailsModal({ showId, onClose }) {
    const [show, setShow] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isTrackable, setIsTrackable] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const { myShowIds, setMyShowIds } = useMyShowIds();

    useEffect(() => {
        if (!showId) return;
        setLoading(true);
        setIsExpanded(false);
        getShowById(showId).then(json => {
            setShow(json.data);
            setIsTrackable(!["Ended", "Canceled"].includes(json.data.status));
            setLoading(false);
        });
    }, [showId]);

    if (!showId) return null;
    const isTracking = id => myShowIds.includes(id);

    // const isTracking = showId => myShowIds.includes(showId);

    const trackShowDefaults = (showId) => {
        setLoading(true);
        const body = {
            tmdbId: showId,
            tvmazeId: showId,
            notifyNewEpisode: true,
            notifyEpisodeOnReleaseDay: true,
            notifyNewSeason: true,
            notifySeasonConfirmed: false,
            notifyEpisodeDayBefore: false,
            notifyEpisodeAfterRelease: false,
            tracking: true
        };

        trackNewShowDefault(body)
            .then((res) => {
                if (res.statusCode === 200) {
                    toast.success("Show added with default notifications. You can change this later");
                    setMyShowIds(prev =>
                        prev.includes(showId) ? prev : [...prev, showId]
                    );
                } else {
                    toast.error("Failed to track show! Try again after some time");
                }
            })
            .catch(() => {
                toast.error("Failed to track show! Try again after some tim");
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="modal-backdrop">
            {/* Added max-h and overflow-y-auto to handle the expansion */}
            <div className={`modal transition-all duration-300 ${isExpanded ? 'max-w-4xl' : 'max-w-2xl'} max-h-[90vh] overflow-y-auto`}>
                <button className="close-btn" onClick={onClose}>×</button>

                {loading && <p className="p-10 text-center">Loading show data...</p>}

                {show && (
                    <div className="p-2">
                        <div className="modal-header flex flex-col md:flex-row gap-6">
                            <img
                                src={`https://image.tmdb.org/t/p/w300${show.poster_path}`}
                                alt={show.name}
                                className="w-[200px] rounded-lg shadow-2xl self-start"
                            />

                            <div className="flex flex-col gap-2 flex-1">
                                <h2 className="text-3xl font-extrabold text-white">{show.name}</h2>
                                {show.tagline && <p className="italic text-slate-400 italic text-sm">"{show.tagline}"</p>}

                                <div className="flex flex-wrap gap-2 mt-2">
                                    {show.genres.map(g => (
                                        <span key={g.id} className="px-2 py-0.5 text-[10px] uppercase tracking-wider rounded bg-slate-700 text-slate-200">
                                            {g.name}
                                        </span>
                                    ))}
                                </div>

                                <p className="mt-4 text-sm text-slate-300 leading-relaxed line-clamp-4">
                                    {show.overview}
                                </p>

                                <div className="mt-6 flex items-center gap-3">
                                    {/* ENABLED BUTTON: Toggles expansion */}
                                    <button
                                        onClick={() => setIsExpanded(!isExpanded)}
                                        className="px-4 py-2 rounded-md text-sm font-semibold bg-slate-700 hover:bg-slate-600 text-white flex items-center gap-2 transition"
                                    >
                                        {isExpanded ? <><ChevronUp size={16} /> Less Details</> : <><ChevronDown size={16} /> More Details</>}
                                    </button>

                                    <button
                                        disabled={!isTrackable || isTracking(showId)}
                                        onClick={() => trackShowDefaults(showId)}
                                        className={`px-4 py-2 rounded-md text-sm font-semibold transition ${!isTrackable ? "bg-slate-800 text-slate-500 cursor-not-allowed" :
                                            isTracking(showId) ? "bg-blue-600 text-white" : "bg-green-600 hover:bg-green-700 text-white"
                                            }`}
                                    >
                                        {isTracking(showId) ? "Tracking" : "Track Show"}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* ADDITIONAL DETAILS SECTION (Visible only when expanded) */}
                        {isExpanded && (
                            <div className="mt-10 pt-8 border-t border-slate-700 grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-4 duration-300">

                                {/* Production Info */}
                                <div>
                                    <h3 className="text-white font-bold mb-4 flex items-center gap-2">Production & Network</h3>
                                    <div className="space-y-3 text-sm">
                                        <p><span className="text-slate-500">Network:</span> {show.networks[0]?.name}</p>
                                        <p><span className="text-slate-500">Creators:</span> {show.created_by.map(c => c.name).join(', ')}</p>
                                        <p><span className="text-slate-500">First Aired:</span> {show.first_air_date}</p>
                                        <a href={show.homepage} target="_blank" className="text-indigo-400 flex items-center gap-1 hover:underline">
                                            Official Website <ExternalLink size={12} />
                                        </a>
                                        <p><span className="text-slate-500">Status:</span> <span className={show.status === "Returning Series" ? "text-green-400" : "text-slate-300"}>{show.status}</span></p>
                                    </div>
                                </div>

                                {/* Season List */}
                                <div>
                                    <h3 className="text-white font-bold mb-4">Seasons</h3>
                                    <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                                        {show.seasons.map(season => (
                                            <div key={season.id} className="bg-slate-900/50 p-3 rounded flex justify-between items-center">
                                                <div>
                                                    <p className="text-sm font-medium text-slate-200">{season.name}</p>
                                                    <p className="text-xs text-slate-500">{season.episode_count} Episodes • {season.air_date?.split('-')[0]}</p>
                                                </div>
                                                {season.vote_average > 0 && (
                                                    <span className="text-xs bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded">
                                                        ★ {season.vote_average.toFixed(1)}
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                    <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700">
                                        <p className="text-[10px] uppercase text-slate-500 font-bold">Original Language</p>
                                        <p className="text-white capitalize">{show.original_language}</p>
                                    </div>
                                    <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700">
                                        <p className="text-[10px] uppercase text-slate-500 font-bold">Avg Runtime</p>
                                        <p className="text-white">{show.last_episode_to_air?.runtime || 'N/A'} min</p>
                                    </div>
                                    <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700">
                                        <p className="text-[10px] uppercase text-slate-500 font-bold">Rating</p>
                                        <p className="text-yellow-500 font-bold">★ {show.vote_average?.toFixed(1)}</p>
                                    </div>
                                    <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700">
                                        <p className="text-[10px] uppercase text-slate-500 font-bold">Total Content</p>
                                        <p className="text-white">{show.number_of_episodes} eps</p>
                                    </div>
                                </div>

                                {show.next_episode_to_air && (
                                    <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center justify-between">
                                        <div>
                                            <p className="text-green-500 text-xs font-bold uppercase">Next Episode Confirmed</p>
                                            <h4 className="text-white font-semibold">{show.next_episode_to_air.name}</h4>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-white font-mono font-bold">{show.next_episode_to_air.air_date}</p>
                                            <p className="text-slate-400 text-xs">S{show.next_episode_to_air.season_number} E{show.next_episode_to_air.episode_number}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Last Episode Info */}
                                {show.last_episode_to_air && (
                                    <div className="md:col-span-2 bg-indigo-500/5 border border-indigo-500/20 p-4 rounded-lg">
                                        <h3 className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">Last Episode Aired</h3>
                                        <p className="text-white font-semibold">{show.last_episode_to_air.name} (S{show.last_episode_to_air.season_number}E{show.last_episode_to_air.episode_number})</p>
                                        <p className="text-sm text-slate-400 mt-1">{show.last_episode_to_air.overview}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}