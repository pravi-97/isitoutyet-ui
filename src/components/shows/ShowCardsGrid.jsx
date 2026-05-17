const IMAGE_BASE = "https://image.tmdb.org/t/p/w300";
import ShowDetailsModal from "../ShowDetailsModal";
import {useState} from "react";

export default function ShowCardsGrid({ shows, title }) {
    const [selectedShowId, setSelectedShowId] = useState(null);
    return (
        <section className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-4">
                {title}
            </h2>

            {/* Center wrapper (matches Home padding behavior) */}
            <div className="flex justify-center">
                <div
                    className="
            grid gap-x-4 gap-y-6
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-4
            lg:grid-cols-5
            xl:grid-cols-6
            w-full
            max-w-full
          "
                >
                    {shows.map((show) => (
                        <div
                            key={show.id}
                            className="mx-auto max-w-[140px]"
                        >
                            <div className="rounded-lg overflow-hidden bg-slate-800 border border-slate-700 hover:scale-105 transition"
                                onClick={() => setSelectedShowId(show.id)}>
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

                            <h3 className="mt-2 text-sm font-medium text-white truncate text-center">
                                {show.name}
                            </h3>

                            <p className="text-xs text-slate-400 text-center">
                                {show.first_air_date?.slice(0, 4) || "—"}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <ShowDetailsModal
                key={selectedShowId} 
                showId={selectedShowId}
                onClose={() => setSelectedShowId(null)}
            />
        </section>
    );
}
