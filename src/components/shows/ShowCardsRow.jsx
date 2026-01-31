const IMAGE_BASE = "https://image.tmdb.org/t/p/w300";
import ShowDetailsModal from "../ShowDetailsModal";
import { useState } from "react";

export default function ShowCardsRow({ shows, title, message }) {
  const [selectedShowId, setSelectedShowId] = useState(null);
  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold text-white mb-4">
        {title}
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {shows.length === 0 && (
          <p className="text-slate-300">
            {message || "No shows found"}
          </p>
        )}
        {shows.map((show) => (
          <div
            key={show.id}
            className="min-w-[140px] max-w-[140px] flex-shrink-0"
            onClick={() => setSelectedShowId(show.id)}
          >
            <div className="rounded-lg overflow-hidden bg-slate-800 border border-slate-700 hover:scale-105 transition">
              <img
                src={
                  show.poster_path
                    ? `${IMAGE_BASE}${show.poster_path}`
                    : "/poster-placeholder.png"
                }
                alt={show.name}
                className="w-full h-[210px] object-cover"
              />
            </div>

            <h3 className="mt-2 text-sm font-medium text-white truncate">
              {show.name}
            </h3>

            <p className="text-xs text-slate-400">
              {show.first_air_date?.slice(0, 4) || "—"}
            </p>
          </div>
        ))}
      </div>
      <ShowDetailsModal
        showId={selectedShowId}
        onClose={() => setSelectedShowId(null)}
      />
    </section>
  );
}