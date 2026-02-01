import { useEffect, useState } from "react";
import { getAllTrackedShows, updateTrackedShows } from "@/api/showApi";
import { toast } from "react-hot-toast";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w300";

/**
 * Configuration for visible notification columns.
 * "notifyNewEpisode" is omitted here as it's handled in the background.
 */
const NOTIF_COLUMNS = [
  {
    key: "notifyEpisodeDayBefore",
    label: "Day Before",
    sub: "24h Early",
  },
  {
    key: "notifyEpisodeOnReleaseDay",
    label: "Release Day",
    sub: "On Air",
  },
  {
    key: "notifyEpisodeAfterRelease",
    label: "After Air",
    sub: "Catch up",
  },
  {
    key: "notifySeasonConfirmed",
    label: "Confirmed",
    sub: "Renewal",
  },
  {
    key: "notifyNewSeason",
    label: "New Season",
    sub: "Premiere",
  },
];

const TogglePill = ({ checked, disabled, onClick }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`relative inline-flex h-5 w-10 items-center rounded-full transition-all focus:outline-none
      ${checked ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" : "bg-slate-700"}
      ${disabled ? "opacity-20 cursor-not-allowed" : "cursor-pointer hover:scale-105 active:scale-95"}
    `}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 shadow-sm
        ${checked ? "translate-x-5" : "translate-x-1"}
      `}
    />
  </button>
);

const TrackedShowsGrid = () => {
  const [shows, setShows] = useState([]);
  const [initialShows, setInitialShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getAllTrackedShows().then((res) => {
      const normalized =
        res.data?.map((item) => ({
          showId: item.showId,
          name: item.tmdbTvShowDetailsDto.name,
          posterPath: item.tmdbTvShowDetailsDto.poster_path,
          firstAirDate: item.tmdbTvShowDetailsDto.first_air_date,
          ...item.userShowDto,
        })) ?? [];

      setShows(normalized);
      setInitialShows(JSON.parse(JSON.stringify(normalized)));
      setLoading(false);
    });
  }, []);

  const toggleFlag = (showId, field) => {
    setShows((prev) =>
      prev.map((s) => (s.showId === showId ? { ...s, [field]: !s[field] } : s))
    );
  };

  const isDirty = JSON.stringify(shows) !== JSON.stringify(initialShows);

  const handleSave = async () => {
    setSaving(true);
    try {
      const changedShows = shows.filter(
        (show, index) => JSON.stringify(show) !== JSON.stringify(initialShows[index])
      );
      
      await updateTrackedShows(changedShows)
      .then((res) => {
          if(res.statusCode === 200){
            toast.success("Changes saved successfully");
            setInitialShows(JSON.parse(JSON.stringify(shows)));
          }else {
            toast.error(res.message);
          }
      })
    //   setInitialShows(JSON.parse(JSON.stringify(shows)));
    } catch (err) {
       toast.error(res.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10 text-slate-400 animate-pulse">Loading library...</div>;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 px-6 py-8 pb-32">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white">Manage Notifications</h2>
        <p className="text-sm text-slate-400 mt-1">Select when you want to receive email alerts for each show.</p>
      </div>

      {/* Grid Header */}
      <div className="grid grid-cols-[3fr_repeat(5,1fr)] px-4 py-3 border-b border-slate-800">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 self-end">
          TV Series
        </span>
        {NOTIF_COLUMNS.map((col) => (
          <div key={col.key} className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
              {col.label}
            </span>
            <span className="text-[9px] text-slate-500 font-medium leading-none">
              {col.sub}
            </span>
          </div>
        ))}
      </div>

      {/* Show Rows */}
      <div className="mt-4 space-y-3">
        {shows.map((show) => (
          <div
            key={show.showId}
            className={`grid grid-cols-[3fr_repeat(5,1fr)] items-center px-4 py-4 rounded-xl border border-slate-800 transition-all
              ${show.tracking ? "bg-slate-800/40 hover:bg-slate-800/80 shadow-sm" : "opacity-30 grayscale"}
            `}
          >
            {/* Show Identity */}
            <div className="flex items-center gap-5 pr-4">
              <div className="relative h-20 w-14 flex-shrink-0 overflow-hidden rounded-md border border-slate-700 shadow-md">
                <img
                  src={show.posterPath ? `${IMAGE_BASE}${show.posterPath}` : "/poster-placeholder.png"}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold text-white truncate leading-tight">
                  {show.name}
                </span>
                <span className="text-xs text-slate-400 mt-1">
                  {show.firstAirDate?.slice(0, 4) || "—"}
                </span>
              </div>
            </div>

            {/* Notification Columns (Specific Order) */}
            {NOTIF_COLUMNS.map((col) => (
              <div key={col.key} className="flex justify-center">
                <TogglePill
                  checked={show[col.key]}
                  disabled={!show.tracking}
                  onClick={() => toggleFlag(show.showId, col.key)}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Floating Save Action */}
      <div
        className={`fixed bottom-10 left-1/2 -translate-x-1/2 transition-all duration-500 z-50 ${
          isDirty ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-8 bg-slate-800 border border-slate-700 px-8 py-4 rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)]">
          <div className="hidden sm:block">
            <p className="text-white text-sm font-bold">Unsaved Changes</p>
            <p className="text-slate-400 text-xs">Update your alerts for these {shows.length} shows.</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="whitespace-nowrap bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackedShowsGrid;