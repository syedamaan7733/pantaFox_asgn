import { useCallback, useState } from "react";
import API_CONFIG from "../utils/API_CONFIG";

const useMovieSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const searchMovies = useCallback(async (query) => {
    // console.log("hiii search", query)
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);
      setSearchError(null);

      const response = await fetch(
        `${API_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(
          query
        )}&include_adult=false&language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${API_CONFIG.BEARER_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      // Get top 8 movies from the response
      setSearchResults(data.results?.slice(0, 8) || []);
      return data?.results;
    } catch (err) {
      setSearchError(err.message);
      console.error("Error searching movies:", err);
    } finally {
      setIsSearching(false);
    }
  }, []);

  return { searchResults, isSearching, searchError, searchMovies };
};

export default useMovieSearch;
