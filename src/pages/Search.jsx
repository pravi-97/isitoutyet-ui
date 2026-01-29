import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ShowCardsGrid from "../components/shows/ShowCardsGrid";
import { searchShowByName } from "../api/showApi";
import SearchBar from "../components/SearchBar";

const MAX_PAGE = 10;

const Search = () => {
    // const [searchParams] = useSearchParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [showName, setShowName] = useState(searchParams.get("showName"));
    const [shows, setShows] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState(showName ?? "");

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const observerRef = useRef(null);

    const handleSearch = () => {
        if (query.trim().length < 2) return;
        console.log(query);

        setLoading(true);
        setError(null);
        setShows([]);
        setPage(1);
        setHasMore(true);
        setShowName(query);
        setSearchParams({ showName: query });
        searchShowByName(query, 1)
            .then((res) => {
                setShows(res.data.results ?? []);
            })
            .catch((err) => {
                setError(err.message);
                setHasMore(false);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        if (!showName || showName.trim().length < 2) return;

        setLoading(true);
        setError(null);
        setShows([]);
        setPage(1);
        setHasMore(true);

        searchShowByName(showName, 1)
            .then((res) => {
                setShows(res.data.results ?? []);
            })
            .catch((err) => {
                setError(err.message);
                setHasMore(false);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [showName]);

    useEffect(() => {
        if (page === 1) return;
        if (!hasMore || page > MAX_PAGE) return;

        setLoading(true);

        searchShowByName(showName, page)
            .then((res) => {
                const results = res.data.results ?? [];

                setShows((prev) => [...prev, ...results]);

                if (results.length === 0 || page >= MAX_PAGE) {
                    setHasMore(false);
                }
            })
            .catch((err) => {
                setError(err.message);
                setHasMore(false);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [page]);

    useEffect(() => {
        if (!observerRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (
                    entry.isIntersecting &&
                    !loading &&
                    hasMore &&
                    page < MAX_PAGE
                ) {
                    setPage((prev) => prev + 1);
                }
            },
            { threshold: 1 }
        );

        observer.observe(observerRef.current);

        return () => observer.disconnect();
    }, [loading, hasMore, page]);

    if (!showName) {
        return <p className="text-slate-400">Start typing to search shows</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="px-6 py-4 bg-slate-900 min-h-screen">
            <SearchBar
                value={query}
                onChange={setQuery}
                onSearch={handleSearch}
            />

            <ShowCardsGrid
                shows={shows}
                title={`Search results for "${showName}"`}
            />

            <div ref={observerRef} className="h-10" />

            {loading && (
                <p className="text-slate-400 text-center mt-4">
                    Loading more…
                </p>
            )}

            {!hasMore && page >= MAX_PAGE && (
                <p className="text-slate-400 text-center mt-6">
                    No more shows to load
                </p>
            )}
        </div>
    );
};

export default Search;
