import { useEffect, useState } from "react";
import { getShowById } from "../api/showApi";
import "./styles/ShowDetailsModal.css";

export default function ShowDetailsModal({ showId, onClose }) {
    const [show, setShow] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isTrackable, setIsTrackable] = useState(false);

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
                                        disabled={!isTrackable}
                                        className={`px-4 py-2 rounded-md text-sm font-semibold transition ${isTrackable
                                            ? "bg-green-600 hover:bg-green-700 text-white"
                                            : "bg-slate-700 text-slate-400 cursor-not-allowed"
                                            }`}
                                    >
                                        Track
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
