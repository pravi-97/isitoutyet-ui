import { useEffect, useState } from "react";
import { getShowById, trackNewShowDefault } from "../api/showApi";
import "./styles/ShowDetailsModal.css";
import { useMyShowIds } from "../context/AppContext";
import toast from "react-hot-toast";
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

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
                if (res.statusCode === 201) {
                    toast.success("Show added with default notifications.");
                    setMyShowIds(prev => prev.includes(showId) ? prev : [...prev, showId]);
                } else {
                    toast.error("Failed to track show!");
                }
            })
            .catch(() => toast.error("Failed to track show!"))
            .finally(() => setLoading(false));
    };

    return (
        <div className="modal-backdrop flex items-center justify-center p-0 md:p-4">
            <div className={`modal relative transition-all duration-300 w-full h-full md:w-full md:h-auto ${isExpanded ? 'md:max-w-4xl' : 'md:max-w-2xl'} md:max-h-[90vh] overflow-y-auto rounded-none md:rounded-xl shadow-2xl`}>

                <button className="close-btn absolute top-4 right-4 z-10 text-2xl" onClick={onClose}>×</button>

                {loading && <p className="p-10 text-center text-slate-400">Loading show data...</p>}

                {show && (
                    <div className="p-3 md:p-6">
                        {/* Header Section: Poster + Title */}
                        <div className="flex flex-col md:flex-row gap-3 md:gap-6">
                            <img
                                src={`https://image.tmdb.org/t/p/w300${show.poster_path}`}
                                alt={show.name}
                                className="w-full max-w-[200px] mx-auto md:mx-0 rounded-lg shadow-lg self-start"
                            />

                            <div className="flex flex-col gap-2 flex-1 text-center md:text-left">
                                <h2 className="text-3xl font-extrabold text-white">{show.name}</h2>
                                {show.tagline && <p className="italic text-slate-400 text-sm">"{show.tagline}"</p>}

                                <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
                                    {show.genres.map(g => (
                                        <span key={g.id} className="px-2 py-0.5 text-[10px] uppercase tracking-wider rounded bg-slate-700 text-slate-200">
                                            {g.name}
                                        </span>
                                    ))}
                                </div>

                                <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                                    {show.overview}
                                </p>

                                {/* Action Buttons */}
                                <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                                    <button
                                        onClick={() => setIsExpanded(!isExpanded)}
                                        className="w-full sm:w-auto px-4 py-2 rounded-md text-sm font-semibold bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center gap-2 transition"
                                    >
                                        {isExpanded ? <><ChevronUp size={16} /> Less Details</> : <><ChevronDown size={16} /> More Details</>}
                                    </button>

                                    <button
                                        disabled={!isTrackable || isTracking(showId)}
                                        onClick={() => trackShowDefaults(showId)}
                                        className={`w-full sm:w-auto px-4 py-2 rounded-md text-sm font-semibold transition ${!isTrackable ? "bg-slate-800 text-slate-500 cursor-not-allowed" :
                                            isTracking(showId) ? "bg-blue-600 text-white" : "bg-green-600 hover:bg-green-700 text-white"
                                            }`}
                                    >
                                        {isTracking(showId) ? "Tracking" : "Track Show"}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Expanded Details */}
                        {isExpanded && (
                            <div className="mt-8 pt-8 border-t border-slate-700 space-y-8 animate-in fade-in slide-in-from-top-4 duration-300">

                                {/* Quick Stats Grid */}
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                                    <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700">
                                        <p className="text-[10px] uppercase text-slate-500 font-bold">Language</p>
                                        <p className="text-white capitalize">{show.original_language}</p>
                                    </div>
                                    <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700">
                                        <p className="text-[10px] uppercase text-slate-500 font-bold">Runtime</p>
                                        <p className="text-white">{show.last_episode_to_air?.runtime || 'N/A'} min</p>
                                    </div>
                                    <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700">
                                        <p className="text-[10px] uppercase text-slate-500 font-bold">Rating</p>
                                        <p className="text-yellow-500 font-bold">★ {show.vote_average?.toFixed(1)}</p>
                                    </div>
                                    <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700">
                                        <p className="text-[10px] uppercase text-slate-500 font-bold">Total Ep</p>
                                        <p className="text-white">{show.number_of_episodes}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Production Info */}
                                    <div>
                                        <h3 className="text-white font-bold mb-4">Production</h3>
                                        <div className="space-y-3 text-sm">
                                            <p><span className="text-slate-500">Network:</span> {show.networks[0]?.name}</p>
                                            <p><span className="text-slate-500">Creators:</span> {show.created_by.map(c => c.name).join(', ') || 'N/A'}</p>
                                            <p><span className="text-slate-500">First Aired:</span> {show.first_air_date}</p>
                                            <a href={show.homepage} target="_blank" rel="noreferrer" className="text-indigo-400 flex items-center gap-1 hover:underline">
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
                                                <div key={season.id} className="bg-slate-900/50 p-3 rounded flex justify-between items-center border border-transparent hover:border-slate-700 transition">
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
                                </div>

                                {/* Next Episode Banner */}
                                {show.next_episode_to_air && (
                                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
                                        <div className="text-center sm:text-left">
                                            <p className="text-green-500 text-[10px] font-bold uppercase">Next Episode</p>
                                            <h4 className="text-white font-semibold">{show.next_episode_to_air.name}</h4>
                                        </div>
                                        <div className="text-center sm:text-right">
                                            <p className="text-white font-mono font-bold">{show.next_episode_to_air.air_date}</p>
                                            <p className="text-slate-400 text-xs">S{show.next_episode_to_air.season_number} E{show.next_episode_to_air.episode_number}</p>
                                        </div>
                                    </div>
                                )}
                                {show.last_episode_to_air && (
                                    <div className="md:col-span-2 bg-indigo-500/5 border border-indigo-500/20 p-4 rounded-lg">
                                        <h3 className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2 text-center md:text-left">
                                            Last Episode Aired
                                        </h3>
                                        <p className="text-white font-semibold text-center md:text-left">
                                            {show.last_episode_to_air.name} (S{show.last_episode_to_air.season_number}E{show.last_episode_to_air.episode_number})
                                        </p>
                                        <p className="text-sm text-slate-400 mt-2 leading-relaxed text-center md:text-left">
                                            {show.last_episode_to_air.overview || "No overview available for this episode."}
                                        </p>
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