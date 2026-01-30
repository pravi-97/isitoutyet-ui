import { useEffect, useState } from "react";
import { getShowById, trackNewShowDefault } from "../api/showApi";
import "./styles/ShowDetailsModal.css";
import { useMyShowIds } from "../context/AppContext";
import toast from "react-hot-toast";
import { Send } from 'lucide-react';

export default function ShowDetailsModal({ showId, onClose }) {
    const [show, setShow] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isTrackable, setIsTrackable] = useState(false);
    const { myShowIds, setMyShowIds } = useMyShowIds();

    useEffect(() => {
        if (!showId) return;

        const original = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = original || "auto";
        };
    }, [showId]);
    useEffect(() => {
        if (!showId) return;

        setLoading(true);
        getShowById(showId)
            .then(json => {
                setShow(json.data);
                setIsTrackable(!["Ended", "Canceled"].includes(json.data.status));
                setLoading(false);
            });
    }, [showId]);

    if (!showId) return null;

    const isTracking = showId => myShowIds.includes(showId);

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
            <div className="modal">
                <button className="close-btn" onClick={onClose}>×</button>

                {loading && <p>Loading...</p>}

                {show && (
                    <>
                        <div className="modal-header">
                            <img
                                src={`https://image.tmdb.org/t/p/w300${show.poster_path}`}
                                alt={show.name}
                                className="w-[160px] rounded-lg self-start"
                            />

                            <div className="flex flex-col gap-2 flex-1">
                                <h2 className="text-3xl font-extrabold tracking-tight">
                                    {show.name}
                                </h2>

                                {show.tagline && (
                                    <p className="italic text-slate-400">
                                        {show.tagline}
                                    </p>
                                )}

                                <div className="flex flex-wrap gap-2 mt-2">
                                    {show.genres.map(g => (
                                        <span
                                            key={g.id}
                                            className="px-2 py-1 text-xs rounded-full bg-slate-700 text-slate-200"
                                        >
                                            {g.name}
                                        </span>
                                    ))}
                                </div>

                                <div className="text-sm text-slate-300 mt-2 flex flex-wrap gap-x-4 gap-y-1">
                                    <span><b>Status:</b> {show.status}</span>
                                    <span><b>Seasons:</b> {show.number_of_seasons}</span>
                                    <span><b>Episodes:</b> {show.number_of_episodes}</span>
                                </div>

                                <p className="mt-4 text-sm text-slate-200 leading-relaxed">
                                    {show.overview}
                                </p>

                                {/* Buttons */}
                                <div className="mt-4 flex gap-3">
                                    <button
                                        disabled
                                        className="px-4 py-2 rounded-md text-sm font-semibold bg-slate-700 text-slate-400 cursor-not-allowed"
                                    >
                                        More details
                                    </button>
                                    <button
                                        disabled={!isTrackable || isTracking(showId)}
                                        onClick={() => trackShowDefaults(showId)}
                                        className={`px-4 py-2 rounded-md text-sm font-semibold transition
                                        ${!isTrackable
                                                ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                                                : isTracking(showId)
                                                    ? "bg-blue-600 text-white cursor-default"
                                                    : "bg-green-600 hover:bg-green-700 text-white"
                                            }`}
                                    >
                                        {isTracking(showId) ? (
                                            "Tracking"
                                        ) : (
                                            <span className="inline-flex items-center gap-1">
                                                Track {loading && <Send size={14} />}
                                            </span>
                                        )}


                                    </button>



                                    {!isTrackable && (
                                        <p className="mt-1 text-xs text-slate-400">
                                            Tracking is disabled for ended or canceled shows
                                        </p>
                                    )}

                                </div>
                            </div>
                        </div>


                    </>
                )}
            </div>
        </div>
    );
}
