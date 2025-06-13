import { useEffect, useRef, useState } from "react";
import useDebounce from "../hooks/useDebounse";
import useMovieSearch from "../hooks/useMovieSearch";
import { Film, Loader2, Search } from "lucide-react";
import API_CONFIG from "../utils/API_CONFIG";
import { useAppContext } from "../context/AppContext";
import useMovieData from "../hooks/useMovieData";

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 500); // 500ms debounce
  const { searchResults, isSearching, searchError, searchMovies } =
    useMovieSearch();

  const { updateMovie, movies } = useMovieData();
  console.log(searchResults);
  const {
    screenSize: { isMobile, isDesktop },
  } = useAppContext();
  const searchRef = useRef(null);

  // Handle debounced search
  useEffect(() => {
    if (debouncedQuery) {
      searchMovies(debouncedQuery);
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [debouncedQuery, searchMovies]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (query.trim()) {
        try {
          const results = await searchMovies(query.trim());

          if (results && results.length > 0) {
            updateMovie(results);
          }

          setIsOpen(false);
        } catch (error) {
          console.error("Search failed:", error);
        }
      }
    }
  };

  const handleMovieClick = (movie) => {
    setIsOpen(false);
    setQuery(movie.title);
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-500" />
        </div>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Search movies..."
          className={`w-full pl-10 pr-4 py-2 bg-white/20 backdrop-blur-sm border border-${
            !isDesktop ? `black/30` : `white/30`
          } rounded-lg  ${
            !isDesktop
              ? `placeholder-black focus:ring-black/40 text-black`
              : `placeholder-white/70 focus:ring-white/50 text-white`
          } focus:outline-none focus:ring-2  focus:border-transparent transition-all duration-200`}
        />
        {isSearching && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <Loader2
              className={`h-4 w-4 text-${
                !isDesktop ? `black` : `white`
              } animate-spin`}
            />
          </div>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (query.trim() || searchResults.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-80 overflow-y-auto z-50">
          {isSearching ? (
            <div className="p-4 text-center text-gray-500">
              <Loader2 className="h-5 w-5 animate-spin mx-auto mb-2" />
              Searching...
            </div>
          ) : searchError ? (
            <div className="p-4 text-center text-red-500">
              <p>Search failed: {searchError}</p>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="py-2">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide bg-gray-50">
                Top Search
              </div>
              {searchResults.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => handleMovieClick(movie.title)}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {movie.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : query.trim() && !isSearching ? (
            <div className="p-4 text-center text-gray-500">
              <Film className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              <p>No movies found for "{query}"</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
