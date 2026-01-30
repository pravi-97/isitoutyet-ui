import { useEffect, useState } from "react";
import { fetchTrendingShows, fetchMyDetails } from "../api/showApi";
import ShowCardsRow from "../components/shows/ShowCardsRow";
import { logout } from "../services/authService";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import { useMyShowIds } from "../context/AppContext";
import NotificationsInlineRow from "../components/NotificationsInlineRow";

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [trendingError, setTrendingError] = useState(null);
  const [myDetailsError, setMyDetailsError] = useState(null);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [myDetails, setMyDetails] = useState({});
  const [myShows, setMyShows] = useState([]);
  const navigate = useNavigate();
  const { myShowIds, setMyShowIds } = useMyShowIds();


  const handleSearch = () => {
    if (query.trim().length < 2) return;
    navigate(`/search?showName=${encodeURIComponent(query.trim())}`);
  };

  useEffect(() => {
    let cancelled = false;

    fetchTrendingShows(1)
      .then((res) => {
        if (!cancelled) setTrending(res.data.results ?? []);
      })
      .catch((err) => {
        if (!cancelled) setTrendingError(err.message);
      });

    fetchMyDetails()
      .then((res) => {
        if (!cancelled) setMyDetails(res.data.userDto ?? {});
        if (!cancelled) setMyShows(res.data.showDetails ?? []);
        // res.data.showDetails?.forEach(show => {
        //   setMyShowIds(prev =>
        //     prev.includes(show.id) ? prev : [...prev, show.id]
        //   );
        // });
        const ids = res.data.showDetails?.map(s => s.id) ?? [];
        setMyShowIds(ids);
      })
      .catch((err) => {
        if (!cancelled) setMyDetailsError(err.message);
      });

    return () => {
      cancelled = true;
    };
  }, [], myShowIds);

  if (error) {
    return (
      <div className="px-6 py-4 bg-slate-900 min-h-screen">
        <p className="text-red-500">{error}</p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return (
    <div className="px-6 py-4 bg-slate-900 min-h-screen">
      <SearchBar
        value={query}
        onChange={setQuery}
        onSearch={handleSearch}
      />
      {myShowIds.length > 0 ? <NotificationsInlineRow trackedCount={myShowIds.length} notificationsEnabled={true} /> : null}

      <ShowCardsRow shows={myShows} title={"My Shows"} />
      <ShowCardsRow shows={trending} title={"🔥Trending Shows"} />
    </div>
  );
}